const axios = require('axios');

// Define the base URL for the gnews API (without '/top-headlines' or '/search')
const API_URL = 'https://gnews.io/api/v4/search?apikey=cc700c5b2876b21533a312178959d73b';

// Function to fetch news with pagination
const getNews = async (req, res) => {
    try {
        const page = req.query.page || 1;  // Default to page 1 if not provided
        const lang = req.query.lang || 'en';  // Default language to 'en'
        const country = req.query.country || 'us';  // Default country to 'us'
        const max = req.query.max || 10;  // Default max results per page

        const response = await axios.get(`${API_URL}`, {
            params: {
                q: 'india',    // Default query if none provided
                lang: lang,
                country: country,
                max: max,
                page: page,
            },
        });
        
        // Send articles and total pages back to the client
        res.json({
            articles: response.data.articles,
            totalPages: Math.ceil(response.data.totalArticles / max),  // Pagination based on total articles
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Error fetching news' });
    }
};

// Function to handle search queries
const searchNews = async (req, res) => {
    const query = req.query.q;  // Get search query from request
    const page = req.query.page || 1;  // Default to page 1 if not provided
    const lang = req.query.lang || 'en';  // Default language to 'en'
    const country = req.query.country || 'us';  // Default country to 'us'
    const max = req.query.max || 10;  // Default max results per page

    try {
        const response = await axios.get(`${API_URL}`, {
            params: {
                token: process.env.GNEWS_API_KEY,
                q: query || 'india',  // If no query is provided, default to 'india'
                lang: lang,
                country: country,
                max: max,
                page: page,
            },
        });
        
        // Send search results back to the client
        res.json({
            articles: response.data.articles,
            totalPages: Math.ceil(response.data.totalArticles / max),  // Pagination based on total articles
        });
    } catch (error) {
        console.error('Error searching news:', error);
        res.status(500).json({ message: 'Error searching news' });
    }
};

module.exports = { getNews, searchNews };
