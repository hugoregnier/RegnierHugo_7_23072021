const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');



module.exports = {
    register: function (req, res) {

        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let bio = req.body.bio;

        if (email == null || username == null || password || null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
    },
    login: function (req, res) {

    }
}