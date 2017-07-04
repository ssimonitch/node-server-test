const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
// initialize app
const app = express();
// add support for partials
hbs.registerPartials(__dirname + '/views/partials');
// set express config
app.set('view engine', hbs);

// APPLY MIDDLEWARE
// logger middleware
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// // maintenance mode
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// read from static directory
app.use(express.static(__dirname + '/public'));

// hbs helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// set up routes
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Index Page',
    welcomeMessage: 'hoi im temmi'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'MUH PROJECTS',
    welcomeMessage: 'MMMM PRUHJECTS'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling request'
  });
});

// listen on port 3000
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
