const express = require('express');
const hbs = require('hbs');//for views hbs and partials
const fs = require('fs');

var port = 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')//for partials (header, footer, menu, etc.)
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

// Middlewares
app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
// app.use( (req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Bienvenido! a mi sitio web'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: `Error handling request!`
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});