const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.js');
const auth = require('../middleware/auth');
console.log('test user');

router.post('/user/register', userCtrl.register);
router.post('/user/login', userCtrl.login);


router.get('/user/me', auth,userCtrl.getUserProfile);
router.put('/user/me', auth,userCtrl.updateUserProfile);
router.put('/user/sup', auth,userCtrl.deleteUserProfile);


module.exports = router;