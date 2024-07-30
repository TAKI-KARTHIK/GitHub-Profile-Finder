const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/profile/:username', async (req, res) => {
    const username = req.params.username;
    const url = `https://api.github.com/users/${username}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ message: `User ${username} not found.` });
    }
});

app.listen(PORT, () => {
    console.log('Server has started');
    console.log(`Server is running on http://localhost:${PORT}`);
});

// end of server.js
