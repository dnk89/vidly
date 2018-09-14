const express = require('express');
const app = express();

var genres = [{ id: 1, name: "comedy"}, { id: 2, name: "action"}];

app.get('/api/genres', (req, res) => {
    return res.send(genres);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});