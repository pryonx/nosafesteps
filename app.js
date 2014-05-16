var express = require('express')
  , http    = require('http')
  , path    = require('path')

var app = express()

app.set('port', process.env.PORT || 3000)
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')))

var db = require('./models')(app)
