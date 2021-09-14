const {Genre, validate} = require('../models/genre');
// const mongoose = require('mongoose');
const {Movie, validateMovie} = require('../models/movie');

exports.getallgenres = async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  }

exports.creategenres = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();    
    res.send(genre);
  }

exports.updategenres = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
 
    res.send(genre);
  }

exports.deletegenres = async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  }

exports.getonegenre = async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  }