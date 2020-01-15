const express = require('express');
const mongoose = require('mongoose');

const Book = require('./Book');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://user:user123@ds231070.mlab.com:31070/bookservice')
    .then(() => console.log("Connected to Books DB"))
    .catch(err => console.log(err));

app.get('/book', (req, res) => {
    Book.find()
        .then(books => {
            res.json(books)
        })
        .catch(err => {
            if(err) throw err;
        })
});

app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            if(book) res.json(book);
            else res.sendStatus(404);
        })
        .catch(err => {
            if(err) throw err;
        })
});

app.post('/book', (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    });

    newBook.save()
        .then(() => {
            res.send('New book added')
        })
        .catch((err) => {
            if(err) throw err;
        });
});

app.delete('/book/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send('Book removed');
        })
        .catch(err => {
            if(err) throw err;
        })
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
