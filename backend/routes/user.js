const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');
console.log('test user');

router.post('/user/register', userCtrl.register);
router.post('/user/login', userCtrl.login);

router.get('/user/me', userCtrl.getUserProfile);
router.put('/user/me', userCtrl.updateUserProfile);
router.put('/user/sup', userCtrl.deleteUserProfile);


module.exports = router;