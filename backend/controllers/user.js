const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require('../models');



module.exports = {
    register: function (req, res) {

        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let bio = req.body.bio;

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        // TODO verify pseudo length, mail regexp, password etc.

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(function (userFound) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        let newUser = models.User.create({
                            email: email,
                            username: username,
                            password: bcryptedPassword,
                            bio: bio,
                            isAdmin: 0
                        })
                            .then(function (newUser) {
                                return res.status(201).json({
                                    'userID': newUser.id
                                })
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'erreur': 'vous ne pouvez pas ajouter d`utlisateur' });
                            });
                    });
                } else {
                    return res.status(409).json({ 'erreur': 'l`utilisateur existe déjà' });
                }
            })
    },


    login: function (req, res) {

    }
}