const mongoose = require('mongoose');
const Item = require('../../models/item');

mongoose.connect('mongodb://127.0.0.1:27017/item-DB')
    .then(() => {
        console.log("Connection Successful");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

//List of all items
exports.items = async (req, res) => {
    const items = await Item.find({});
    //console.log(items);
    res.render('index', {items})
}

//Add Item Form
exports.addNewItem = (req, res) => {
    res.render('new-item');
}
//Add a new item
exports.addItem = async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    
    res.redirect("/items" + "/?successAdd=true")
  
}

//View Specific item
exports.viewItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('view-item', {item});
}

//Update Item Form
exports.editItemForm = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render('update-item', {item});
}

//Update the item
exports.updateItem = async (req, res) => {
    const {id} = req.params;
    await Item.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/items/${id}` + "/?successUpdate=true")

}

//Delete item
exports.deleteItem = async (req, res) => {
    const {id} = req.params;
    
    await Item.findByIdAndDelete(id);
    
    res.redirect('/items');
}