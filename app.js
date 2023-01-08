const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// use ejs view engine
app.set('view engine', 'ejs');

// Third Party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));

// Build in Middleware
app.use(express.static('public'));

// Application Level Middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.get('/', (req, res) => {
  const nama = 'alfian';
  res.render('index', {
    nama,
    title: 'Home',
    layout: 'layouts/main-layout'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    layout: 'layouts/main-layout'
  });
});

app.get('/quotes', (req, res) => {
  const quotes = [
    {
      word: 'In the depth of winter, I finally learned that within me there lay an invincible summer.',
      author: 'Albert Camus'
    }
  ]
  res.render('quotes', {
    quotes,
    title: 'Quotes',
    layout: 'layouts/main-layout'
  });
});

app.get('/product/:id', (req, res) => {
  res.send(`Product Id : ${req.params.id} <br> Category : ${req.query.category}`);
});

app.use((req, res) => {
  res.status(404);
  res.send('Page Not Found :(');
});

app.listen(port, () => {
  console.log(`server running in port ${port} . . .`);
});