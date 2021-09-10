const express = require('express');
const router = express.Router();

const topicsCtrl = require('../controllers/topics');
console.log('test topics');

router.post('/topics/new', topicsCtrl.createTopic);
router.get('/topics', topicsCtrl.listTopic);


module.exports = router;