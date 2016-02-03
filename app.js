
/**
 * Module dependencies
 */

var express = require('express')
var bodyParser = require('body-parser')

/**
 * Initialize express app
 */

var app = express()

/**
 * Databases
 */

var data = require('./data')

/**
 * Config
 */

app.set('view engine', 'jade')
app.use(express.static('public'))
app.use(bodyParser.json())

/**
 * Routes
 */

// Show app
app.get('/', function(req, res){
  data.getBg = getBg
  res.render('index', data)
})

// Get results
app.post('/', function(req, res){
  res.json('ok')
})

/**
 * Auxiliary background color helper
 */
function getBg(value){
  if(value < 0.85) return "rgba(255, 0, 0, 0.3)"
  if(value < 0.91) return "rgba(255, 255, 0, 0.3)"
  return "rgba(0, 255, 0, 0.3)"
}

app.listen(3333)
