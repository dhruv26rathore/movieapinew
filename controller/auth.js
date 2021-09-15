const {User} = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(15).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).label("password must contain number, symbol, uppercase letter, lowercase letter, min 5 character and max 15 characters")
      };
  
      // "password must contain number, symbol, uppercase letter, lowercase letter, min 5 character and max 15 characters"
  
    return Joi.validate(req, schema);
  }

exports.loginuser = async (req, res) => {
    try{
        const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
        
    let user = await User.findOne({email: req.body.email})
  
    if(!user) res.status(400).send('Invalid email or password');
  
   const validPassword = await bcrypt.compare(req.body.password, user.password)
  
   if(!validPassword) res.status(400).send('Invalid email or password');
   
   const token = user.generateAuthToken();

//    
   await res.send({token:token});
    }
    catch(err) {
        console.log(err.message);
    }
    
}

// Authorization Middleware function
exports.tokenAuth = (req,res,next)=>{
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied No Token Provided');
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}