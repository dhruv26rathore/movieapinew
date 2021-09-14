const {Movie, validate} = require('../models/movie'); 
const {Genre} = require('../models/genre');

exports.getallmovies = async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
  }

exports.createmovies = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    let movie = new Movie({ 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    
    res.send(movie);
  }

exports.updatemovies = async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    const movie = await Movie.findByIdAndUpdate(req.params.id,
      { 
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      }, { new: true });
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    
    res.send(movie);
  }

exports.deletemovies = async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  }

exports.getonemovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
}

exports.gettingmovie = async (req, res) => {
const movie  = await Movie.findById(req.params.id);
if(!movie) return res.status(404).send('The movie with the given ID was not found.');
const genreid = movie.genre._id
console.log("this is genre id" + genreid + "and here it ends");
const genreobj = await Genre.findById(genreid);
console.log("this is genre object " + genreobj + " here it ends")
movie.genre.name = genreobj.name

await Movie.findByIdAndUpdate(req.params.id,
  movie, { new: true });
res.send(movie);
}

exports.gettingallmovies = async (req, res) =>{
  var movies = await Movie.find().sort('name');
  // var newmovies = [];
  for(movie of movies){
      const movieid = movie._id;
      const genreid = movie.genre._id

      const genre = await Genre.findById(genreid);

      movie.genre.name = genre.name;

      await Movie.findByIdAndUpdate(movie._id,movie, { new: true });
  }

  movies = await Movie.find().sort('name');

  res.send(movies);
}