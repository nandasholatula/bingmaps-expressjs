
const express = require('express');
const axios = require('axios');

const app = express();
const apiKey = 'YOUR_BING_MAPS_API_KEY';

app.get('/geocode', async (req, res) => {
    const { query } = req.query;
    const encodedQuery = encodeURIComponent(query);
    
    try {
        const response = await axios.get(`https://dev.virtualearth.net/REST/v1/Locations?q=${encodedQuery}&key=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Bing Maps API', error);
        res.status(500).json({ error: 'Failed to fetch data from Bing Maps API' });
    }
});
