require('dotenv').config()
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const hbs = require('express-handlebars');

const router = require('./routes/main')
const postRoutes = require('./routes/posts')
const subredditRoutes = require('./routes/subreddit')
const commentRoutes = require('./routes/comment')
// Set App Variable
const app = express()

app.use(express.static('public'));

// view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  layoutsDir: path.join(__dirname, '/views/layouts/'),
  partialsDir: path.join(__dirname, '/views/partials/'),
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('views',path.join(__dirname,'views'));

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Routes
app.use(router)
app.use('/posts', postRoutes)
app.use('/n', subredditRoutes)
app.use(commentRoutes)
// Set db
require('./data/reddit-db');

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})

module.exports = app