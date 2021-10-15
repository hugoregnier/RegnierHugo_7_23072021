const express = require('express');
const router = express.Router();
const topicsCtrl = require('../controllers/topics');
const auth = require('../middleware/auth');
console.log('test topics');

router.post('/topics/new', auth,topicsCtrl.createTopic);
router.get('/topics', auth,topicsCtrl.listTopic);


module.exports = router;