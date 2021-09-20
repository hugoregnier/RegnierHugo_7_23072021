const express = require('express');
const router = express.Router();

const messagesCtrl = require('../controllers/messages');
console.log('test messages');

router.post('/messages/new', messagesCtrl.createMessage);
router.post('/messages', messagesCtrl.listMessage);


module.exports = router;