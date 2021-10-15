const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');


const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;

const ITEMS_LIMIT   = 50;


module.exports = {
    createTopic: function(req, res) {
       // identifier l'utilisateur
       var headerAuth  = req.headers['authorization'];
       var userId      = jwtUtils.getUserId(headerAuth);
       
    
        // récupérer des paramètres: titre et contenu
        var title   = req.body.title;
        var content = req.body.content;

        // condition si le titre n'est pas vide      
        if (title == null || content == null) {
          return res.status(400).json({ 'erreur': 'Il manque des parametres' });
        }
        // condition de limite de caractère
        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
          return res.status(400).json({ 'erreur': 'paramètres invalides' });
        }
    
        asyncLib.waterfall([
          function(done) {
            // on va chercher l'utilisateur
            models.User.findOne({
              where: { id: userId }
            })
            .then(function(userFound) {
              done(null, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'erreur': 'impossible de vérifier l`utilisateur' });
            });
          },
          function(userFound, done) {
            if(userFound) {
              // si on a l'utilisateur, on créé le topic
              models.Topic.create({
                title  : title,
                content: content,
                likes  : 0,
                // relie un topic à un identifiant d'utilisateur unique
                UserId : userFound.id
              })
              .then(function(newTopic) {
                done(newTopic);
              });
            } else {
              res.status(404).json({ 'erreur': 'utilisateur introuvable' });
            }
          },
        ], function(newTopic) {
          if (newTopic) {
            return res.status(201).json(newTopic);
          } else {
            return res.status(500).json({ 'erreur': 'impossible de poster le topic' });
          }
        });
      },
    listTopic: function (req, res) {
        // identifier l'utilisateur
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);
        

      // selectionne les colonnes que l'on souhaite afficher
      var fields  = req.query.fields;
      // récupère les Topics par segmentation
      var limit   = parseInt(req.query.limit);
      var offset  = parseInt(req.query.offset);
      // classe les Topics par un ordre particulier
      var order   = req.query.order;

      if (limit > ITEMS_LIMIT) {
        limit = ITEMS_LIMIT;
      }

      models.Topic.findAll({
        order: [(order != null) ? order.split(':') : ['title', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
          model: models.User,
          attributes: [ 'username' ]
        }]
      }).then(function(topics) {
        if (topics) {
          res.status(200).json(topics);
        } else {
          res.status(404).json({ "erreur": "aucun topic trouvé" });
        }
      }).catch(function(err) {
        console.log(err);
        res.status(500).json({ "erreur": "champs non valide" });
      });
    }
}