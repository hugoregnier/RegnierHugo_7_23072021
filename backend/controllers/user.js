const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');

const models = require('../models');



module.exports = {
    register: function (req, res) {

        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let bio = req.body.bio;

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'erreur': 'Il manque des parametres' });
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
                                });
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

        let email = req.body.email;
        let password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'erreur': 'Il manque des parametres' });
        }

        // TODO verify pseudo length, mail regexp, password etc.



        models.User.findOne({
            where: { email: email }
        })
        .then(function (userFound) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBcrypt, resBycrypt) {
                    if (resBycrypt) {
                        return res.status(200).json ({
                            'userID': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json ({ 'erreur': 'Mot de passe invalide' });
                    }
                });
            } else {
                return res.status(404).json ({ 'erreur': 'L`utilisateur n`existe pas dans la base de donnée' });
            }
        
        })
        .catch(function(err) {
            return res.status(500).json({ 'erreur': 'vous ne pouvez pas ajouter d`utlisateur' });
        });


    }
}