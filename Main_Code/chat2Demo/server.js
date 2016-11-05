//listening and emitting an event
//clients emit to the server, not other clients 
//client side emit 
//server is listening for an event
//server gets the event then emits to all clients an event to update
//clients are listening for this update 

// 1) listener for the event
// 2) an emit of the listened for event to trigger an action
// The duplicity stems from the fact that if we have n actions we want to account for with our sockets, we must have 2n events between our listeners and emits combined!

// server can have 3 types of emits:
// 	1)emit - back to the client that triggered the event
// 	2)broadcast - all other users besides the one that triggered the event
// 	3)full broadcast - everyone


//require express and path
var express = require('express');
var path = require('path');

var app = express();
//static content
app.use(express.static(path.join(__dirname, "./static")));
//ejs and view folder
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

//tell express to listen on port
var server = app.listen(8000, function(){
	console.log('cool stuff on 8000');
	console.log('chatroom');
})

var route = require('./routes/index.js')(app, server);