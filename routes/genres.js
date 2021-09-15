const controllerGenres = require('../controller/genres');
const auth = require('../controller/auth');
const express = require('express');
const router = express.Router();

router.get('/', controllerGenres.getallgenres);
router.post('/', auth.tokenAuth,controllerGenres.creategenres);
router.put('/:id', auth.tokenAuth, controllerGenres.updategenres);
router.delete('/:id', auth.tokenAuth,controllerGenres.deletegenres);
router.get('/:id', auth.tokenAuth,controllerGenres.getonegenre);

module.exports = router;