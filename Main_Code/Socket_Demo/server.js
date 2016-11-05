// require express - load the express module
var express = require("express");
// path module
var path = require("path");
// require body-parser since we have form information
var bodyParser = require('body-parser');

//invoke var express and store the resulting application in the var app
// create the express app
var app = express();

app.use(bodyParser.urlencoded());
// static content
app.use(express.static(path.join( __dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// tell the express app to listen on port 8000
var server = app.listen(8000, function(){
 console.log("listening on port 8000");
 console.log('chatroom');
})

// root route to render the index.ejs view
app.get('/', function(req, res){
  res.render('index');
})

//sockets go down below the the server listen information
var io = require('socket.io').listen(server);  // notice we pass the server object
// Whenever a connection event happens (the connection event is built in) run the following code

var users = {}; //hash to store users
var messages = [];
io.sockets.on('connection', function (socket) {

  socket.on('got_new_user', function(data) {
    socketID = socket.id;
    users[socketID] = data.name;
    io.emit('display_users', users);
  })

  socket.on('logoff', function(data){
    delete users[socketID];
    io.emit('user_disconnected', data);
  })

  socket.on('submit', function(data) {
    messages.push({name: data.user, message:data.message});
    io.emit("post_new_message", {new_message: data.message, user: data.user})
  })


  socket.on('load_messages', function (data) {
      users.push(data.user);
      socket.emit('load_messages', {current_user: data.user, messages: messages});
  })

})