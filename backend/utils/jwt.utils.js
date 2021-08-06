const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'v5mn9U2TwRRm4M4a96sS'

module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign ({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
           expiresIn: '1h' 
        })
    }
}