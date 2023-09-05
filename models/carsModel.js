const mongoose = require('mongoose');

const carShema = new mongoose.Schema({
  idCars: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Cars = mongoose.model('Cars', carShema);

module.exports = Cars;