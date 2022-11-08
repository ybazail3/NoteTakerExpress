//  Dependencies
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const notes = require('./db/db.json')
// Middleware

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/api/notes', (req, res) => {
    const data2 = JSON.parse(fs.readFileSync('./db/db.json'));
    res.json(data2);
});

// POST route
    
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const data = JSON.parse(fs.readFileSync('./db/db.json'));
    const { title, text } = req.body;

    if (req.body) {
        const newNote = ({
            id: uuidv4(),
            title,
            text,
        });

    data.push(newNote);
    const string = JSON.stringify(data);
    fs.writeFileSync('./db/db.json', string, err => {
        if (err) throw err;
        console.log("New data added");
    })
    console.log("data is logged: ", data);
    res.json(newNote);
}});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT} 🚀`);
});