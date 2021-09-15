const controllerMovie = require('../controller/movies')
const express = require('express');
const router = express.Router();

router.get('/', controllerMovie.getallmovies);
router.post('/', controllerMovie.createmovies);
router.put('/:id', controllerMovie.updatemovies);
router.delete('/:id', controllerMovie.deletemovies);
router.get('/:id', controllerMovie.getonemovie);

module.exports = router;