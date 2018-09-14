const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send('Welcome to VIDLY app!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});