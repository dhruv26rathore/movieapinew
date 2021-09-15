require('dotenv').config();
const {User, validate} = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');

exports.getallusers = async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
  }

exports.createuser = async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
      
  let user = await User.findOne({email: req.body.email})

  if(user) res.status(400).send('User already exists');

  user = new User(_.pick(req.body,['name','email','password']));

  const getSalt = await bcrypt.genSalt(Math.round(Math.random()*10))
  user.password = await bcrypt.hash(user.password, getSalt)   
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ['_id', 'name', 'email']));
}