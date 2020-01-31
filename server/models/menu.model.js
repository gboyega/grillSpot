const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema ({
   spotId: {
       type: String,
       trim,
       required
   }, 

   menu: {
       name: {
           type: String,
           trim,
           required
       },

       price: {
           type: String,
           trim,
           required
       }
   }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Spot