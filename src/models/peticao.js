const mongoose = require('../database/dbConnection');

const Peticao = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  signed: [
    {
        type: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
});

const User = mongoose.model('peticao', Peticao);

module.exports = User;