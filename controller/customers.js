const {Customer, validate} = require('../models/customer'); 

exports.getallcustomers = async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
  }

exports.createcustomer = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new Customer({ 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    });
    customer = await customer.save();
    
    res.send(customer);
  }

exports.updatecustomer = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }, { new: true });
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(customer);
  }

exports.deletecustomer = async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(customer);
  }

exports.getonecustomer = async (req, res) => {
    const customer = await Customer.findById(req.params.id); 
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
}