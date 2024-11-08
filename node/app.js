const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors")
const authRoutes = require('./routes/authRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

require('dotenv').config();

const app = express();
connectDB();

const corsOptions = {
    origin: "http://localhost:5173",  // Adjust the origin if necessary
    methods: "GET, POST, PUT",
    credentials: true  // Fix: Should be 'credentials'
  };
  app.use(cors(corsOptions));  // Apply corsOptions here
  
app.use(express.json());
app.use('/', authRoutes);
app.use('/supplier',supplierRoutes)
app.use('/product',productRoutes)
app.use('/order',orderRoutes)


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
