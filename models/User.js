const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [5, 'Too short, min is 5 characters'],
max: [32, 'Too long, max is 32 characters']
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    required: false
  }
  
  
});



let User = mongoose.model('User', UserSchema);

module.exports = User;