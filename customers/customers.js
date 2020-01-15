const express = require('express');
const mongoose = require('mongoose');

const Customer = require('./Customer');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://user:user123@ds033175.mlab.com:33175/customerservice')
    .then(() => console.log("Connected to Customer DB"))
    .catch(err => console.log(err));

app.get('/customer', (req, res) => {
    Customer.find()
        .then(customers => {
            res.json(customers)
        })
        .catch(err => {
            if(err) throw err;
        })
});

app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then(customer => {
            if(customer) res.json(customer);
            else res.sendStatus(404);
        })
        .catch(err => {
            if(err) throw err;
        })
});

app.post('/customer', (req, res) => {
    const newCustomer = new Customer({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    });

    newCustomer.save()
        .then(() => {
            res.send('New Customer added')
        })
        .catch((err) => {
            if(err) throw err;
        });
});

app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id)
        .then(() => {
            res.send('Customer removed');
        })
        .catch(err => {
            if(err) throw err;
        })
});

app.listen(5555, () => console.log(`Server started on port 5555`));
