const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');


// const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;

const ITEMS_LIMIT   = 50;


module.exports = {
    createMessage: function(req, res) {
         // identifier l'utilisateur
         var headerAuth  = req.headers['authorization'];
         var userId      = jwtUtils.getUserId(headerAuth);
    
        // récupérer des paramètres: titre et contenu
        var content = req.body.content;
        var topicId = req.body.topicId;

        // condition si le contenu n'est pas vide      
        if ( content == null) {
          return res.status(400).json({ 'erreur': 'Il manque des parametres' });
        }
        // condition de limite de caractère
        if ( content.length <= CONTENT_LIMIT) {
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
              // si on a l'utilisateur, on créé le message
              models.Message.create({
                // title  : title,
                content: content,
                likes  : 0,
                // relie un message à un identifiant d'utilisateur unique
                UserId : userFound.id,
                topicId: topicId
              })
              .then(function(newMessage) {
                done(newMessage);
              });
            } else {
              res.status(404).json({ 'erreur': 'utilisateur introuvable' });
            }
          },
        ], function(newMessage) {
          if (newMessage) {
            return res.status(201).json(newMessage);
          } else {
            return res.status(500).json({ 'erreur': 'impossible de poster le message' });
          }
        });
      },
    listMessage: function (req, res) {

      // selectionne les colonnes que l'on souhaite afficher
      var fields  = req.query.fields;
      // récupère les messages par segmentation
      var limit   = parseInt(req.query.limit);
      var offset  = parseInt(req.query.offset);
      // classe les messages par un ordre particulier
      var order   = req.query.order;
      var topicId = req.body.topicId

      if (limit > ITEMS_LIMIT) {
        limit = ITEMS_LIMIT;
      }

      models.Message.findAll({
        where: { topicId: topicId },
        order: [(order != null) ? order.split(':') : ['title', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
          model: models.User,
          attributes: [ 'username' ]
        }],
      }).then(function(messages) {
        if (messages) {
          res.status(200).json(messages);
        } else {
          res.status(404).json({ "erreur": "aucun message trouvé" });
        }
      }).catch(function(err) {
        console.log(err);
        res.status(500).json({ "erreur": "champs non valide" });
      });
    },
    deleteMessage: function (req, res) {

      var messageId = req.body.messageId


        models.Message.destroy({
          where: {
            id: messageId
          }
      }).then(function () {
          return res.status(201).json('message supprimé');
      }).catch(function (err) {
          res.status(500).json({ 'erreur': 'le message ne peut être supprimé' });
      });
      
    }
}