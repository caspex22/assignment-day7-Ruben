const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define a method to hash and set the user's password
userSchema.methods.setPassword = async function (password) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(password, saltRounds);
};

// Define a method to check the user's password
userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
