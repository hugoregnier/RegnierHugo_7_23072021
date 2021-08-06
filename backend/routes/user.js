const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');
console.log('coucou');

router.post('/user/register', userCtrl.register);
router.post('/user/login', userCtrl.login);

module.exports = router;