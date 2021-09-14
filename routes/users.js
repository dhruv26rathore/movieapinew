const controllerUsers = require('../controller/users');
const express = require('express');
const router = express.Router();

router.get('/', controllerUsers.getallusers);
router.post('/', controllerUsers.createuser);
// router.put('/:id', controllerGenres.updategenres);
// router.delete('/:id', controllerGenres.deletegenres);
// router.get('/:id', controllerGenres.getonegenre);

module.exports = router;