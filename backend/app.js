const express = require('express');
const app = express();


const userRoutes = require('./routes/user')

// const bodyParser = require('body-parser');

const helmet = require("helmet");
app.use(helmet());


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


  // Ces headers permettent :
  // d'accéder à notre API depuis n'importe quelle origine ( '*' ) 
  // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) 
  // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});


app.use('/api/user', userRoutes);

module.exports = app;