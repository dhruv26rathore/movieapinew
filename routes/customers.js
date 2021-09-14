const express = require('express');
const router = express.Router();
const controllerCustomer = require('../controller/customers');

router.get('/', controllerCustomer.getallcustomers);
router.post('/', controllerCustomer.createcustomer);
router.put('/:id', controllerCustomer.updatecustomer);
router.delete('/:id', controllerCustomer.deletecustomer);
router.get('/:id', controllerCustomer.getonecustomer);

module.exports = router; 