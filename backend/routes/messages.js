const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const messagesCtrl = require('../controllers/messages');
console.log('test messages');

router.post('/messages/new', auth,messagesCtrl.createMessage);
router.put('/messages/sup', auth,messagesCtrl.deleteMessage);
router.post('/messages', auth,messagesCtrl.listMessage);


module.exports = router;