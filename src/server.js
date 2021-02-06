require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars');
const path = require('path')

// Set App Variable
const app = express()

app.use(express.static('public'));

// view engine setup
app.set('view engine', 'hbs');
app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout: 'main',
}));
app.set('views',path.join(__dirname,'views'));

// Use Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
const router = require('./routes/index.js')
app.use(router)


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})

module.exports = app