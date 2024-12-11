const mongoose = require('mongoose');
const Item = require('../models/item');

mongoose.connect('mongodb://127.0.0.1:27017/item-DB')
    .then(() => {
        console.log("Connection Successful");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const seedDB = async() => {
    const items = new Item({
        name:'Tshirt',
        category: 'Fashion',
        quantity: 5,
        price: '100',
    })
    await items.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})