
const jwtUtils = require('../utils/jwt.utils');

module.exports = (req, res, next) => {

var headerAuth  = req.headers['authorization'];
var userId      = jwtUtils.getUserId(headerAuth);

if (userId < 0)
      res.status(400).json({ 'erreur': 'token invalide' });
else
next();
};