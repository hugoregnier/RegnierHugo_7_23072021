const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

module.exports = (req, res, next) => {

var headerAuth  = req.headers['authorization'];
var userId      = jwtUtils.getUserId(headerAuth);
var isAdmin      = jwtUtils.isAdmin(headerAuth);
var messageId = req.body.messageId;

models.Message.findOne({
    where: { id: messageId }
}).then(function(message) {
    if (message && (message.userId == userId || isAdmin) ) {
      next();
    } else {
      res.status(400).json({ "erreur": "Le message ne vous appartient pas" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "erreur": "problème serveur" });
  });
}
