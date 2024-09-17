// routes/news.js
const express = require('express');
const { getNews, searchNews } = require('../controllers/newsController');

const router = express.Router();

// Route to fetch news with pagination
router.get('/', getNews);


// Route to search news
router.get('/search', searchNews);

module.exports = router;
