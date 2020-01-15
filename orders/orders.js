const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const Order = require('./Order');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://user:user123@ds263638.mlab.com:63638/orderservice')
    .then(() => console.log("Connected to Orders DB"))
    .catch(err => console.log(err));

app.get('/order', (req, res) => {
    Order.find()
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            if(err) throw err;
        })
});

app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id)
        .then(order => {
            if(order) {
                axios.get('http://localhost:5555/customer/' + order.CustomerId)
                    .then((response) => {
                        let orderObject = { customerName: response.data.name, bookTitle: '' }
                        axios.get('http://localhost:5000/book/' + order.BookId)
                            .then((response) => {
                                orderObject.bookTitle = response.data.title
                                res.json(orderObject);
                            });
                    });
            }
            else res.sendStatus(404);
        })
        .catch(err => {
            if(err) throw err;
        })
});

app.post('/order', (req, res) => {
    const newOrder = new Order({
        CustomerId: mongoose.Types.ObjectId(req.body.CustomerId),
        BookId: mongoose.Types.ObjectId(req.body.BookId),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    });

    newOrder.save()
        .then(() => {
            res.send('New Order added')
        })
        .catch((err) => {
            if(err) throw err;
        });
});

app.listen(7777, () => console.log(`Server started on port 7777`));
