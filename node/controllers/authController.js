const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const generateUserId = () => {
    // Prefix + timestamp + random number for uniqueness
    return `${Date.now()}-${Math.floor(Math.random() * 100)}`;
};
// Register
const register = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateUserId();

    try {
        const user = new User({
            email,
            password: hashedPassword,
            userId,
            name: '', // Default empty value
            dob: null, // Default null value
            cell: '', // Default empty value
            home: '', // Default empty value
            gender: null, // Default null value
            designation: '', // Default empty value
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate JWT token for password reset
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Set up email transporter using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email message with the password reset link
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send reset email. Please try again.' });
            }
            res.status(200).json({ message: 'Password reset link sent to your email.' });
        });

    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { newPassword } = req.body;
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the JWT token
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: 'Invalid token or request' });
    }
};

const userProfile = async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.id).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ message: "User not found" });
    
        res.json(user);
      } catch (error) {
        console.error("Error:", error);
        res.status(401).json({ message: "Unauthorized access" });
      }
}
const updateUserProfile = async (req, res) => {
    const { name, dob, cell, home, gender, designation } = req.body; // Added designation
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verifying token
    const userId = decoded.id;  // Retrieve userId from decoded token payload

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, dob, cell, home, gender, designation }, // Ensure designation is included here
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};

module.exports = {
    updateUserProfile,
    userProfile,
    register,
    login,
    forgotPassword,
    resetPassword,
};
