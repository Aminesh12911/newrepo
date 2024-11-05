const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, unique: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },              // User's full name
    dob: { type: Date },                 // Date of birth
    cell: { type: String },              // Cell phone number
    home: { type: String },              // Home phone number
    gender: { type: String, enum: ['Male', 'Female', 'Other'] }, // Gender/Sex
    designation: { type: String },              // Designation
});

module.exports = mongoose.model('User', UserSchema);
