const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./route/api.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());

const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/AssignmentM21";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Failed:", err));

// Routes
app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));