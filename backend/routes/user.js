const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');
console.log('coucou');

router.post('/user/register', userCtrl.register);
router.post('/user/login', userCtrl.login);

router.get('/user/me', userCtrl.getUserProfile);
router.put('/user/me', userCtrl.updateUserProfile);

module.exports = router;