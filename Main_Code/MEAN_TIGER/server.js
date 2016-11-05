var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, "./client/static")));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
  extended: true
}));
require('./server/config/mongoose.js')
var routes = require('./server/config/routes.js')
routes(app);
app.listen(8000);
