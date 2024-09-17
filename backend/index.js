// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const clc = require("cli-color");
const newsRoutes = require('./routes/news');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
// Routes
app.use('/api/news', newsRoutes);


// Define a basic route for the root
app.get('/', (req, res) => {
    res.send('Welcome to the News API');
  });
  
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(clc.yellow.underline(`http://localhost:${PORT}/`));
});
