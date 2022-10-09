const mongoose = require('../database/dbConnection');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function (next){
  const hashPass = await bcrypt.hash(this.password, 10);
  this.password = hashPass;

  next();
});

const User = mongoose.model('users', UserSchema);

module.exports = User;