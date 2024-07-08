
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 300; // or any other port you prefer

app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/location', async (req, res) => {
    const { lat, lng } = req.query;

    try {
        // Make a GET request to Nominatim API for reverse geocoding
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
        const { data } = response;

        // Extract relevant location details (e.g., city) from response
        const city = data.address.city;

        // Send the location details as JSON response
        res.json({ city });
    } catch (error) {
        console.error('Error fetching location data:', error);
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
})