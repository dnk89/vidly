const express = require('express');
const app = express();

var genres = [{ id: 1, name: "comedy"}, { id: 2, name: "action"}];

app.get('/api/genres', (req, res) => {
    return res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (genre) {
        return res.send(genre);
    } else {
        return res.status(404).send('Genre with given ID not found');
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});