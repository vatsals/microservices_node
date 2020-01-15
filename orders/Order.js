const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    CustomerId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    BookId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    }
});

module.exports = Order = mongoose.model('Order', OrderSchema);