const express = require('express');
const axios = require('axios');
const app = express();

// Set up the view engine
app.set('view engine', 'ejs');
app.use(express.static('public')); // for serving static files

// Route for the homepage
app.get('/', async (req, res) => {
    try {
        // Make a request to the new API to get a random quote
        const response = await axios.get('https://qapi.vercel.app/api/random');
        
        // Extract the quote and author from the API response
        let quote = response.data.quote;
        const author = response.data.author;

        // Add an emoji based on the quote
        let emoji = '';
        if (quote.includes('success')) {
            emoji = '🏆';
        } else if (quote.includes('love') || quote.includes('happy')) {
            emoji = '❤️';
        } else if (quote.includes('failure')) {
            emoji = '💔';
        } else {
            emoji = '✨';
        }

        // Pass the quote, author, and emoji to the index.ejs file
        res.render('index', { quote: `${quote} ${emoji}`, author });
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.send('Error fetching quote');
    }
});

// Set the port number
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
