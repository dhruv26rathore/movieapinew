const controllerGenres = require('../controller/genres');
const express = require('express');
const router = express.Router();

router.get('/', controllerGenres.getallgenres);
router.post('/', controllerGenres.creategenres);
router.put('/:id', controllerGenres.updategenres);
router.delete('/:id', controllerGenres.deletegenres);
router.get('/:id', controllerGenres.getonegenre);

module.exports = router;