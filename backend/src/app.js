const express = require('express');
const newsRoutes = require('./routes/newsRoutes');
const app = express();

app.use('/news', newsRoutes);

module.exports = app;
