const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

generateToken = (params) => jwt.sign({id: String(params.id)}, authConfig.secret, authConfig.expires);

router.post('/register', async(req, res)=>{
  try{
    await User.create(req.body);
    res.send({status: 'User has been created'});
  }catch(e){
    return res.status(400).send({error: 'registration error'});
  }
});

router.post('/authenticate', async(req, res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({email}).select('+password');
  
  if(!(user && await bcrypt.compare(password, user.password)))
    return res.status(401).send({error: 'User or password invalid'});

  return res.send({token: generateToken(user)});
});

module.exports = app => app.use('/auth', router);
