var path = require('path');
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, "./client/static")));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
	extended: true
}));
// require('./server/config/mongoose.js')
// var routes = require('./server/config/routes.js')
// tapp.listen(8000)
require('./server/config/mongoose.js')
var routes = require('./server/config/routes.js')
routes(app);
app.listen(8730, function(){
	console.log('8730')
})