var users_array = [];
var messages_array = [];
var messages_array2 = [];
var messages_array3 = [];

var rooms = ['General', 'Announcements', 'Introductions'];

//check to see if user already exists
var is_user = function(user) {
	var user_count = users_array.length;

	for (var i = 0; i < user_count; i++){
		if(user == users_array[i]){
			return true;
		}
	}
	return false;
}


module.exports = function Route(app, server) {

	//this gets the socket.io module
	var io = require('socket.io').listen(server);

	//setting up the connection event
	io.sockets.on('connection', function(socket){
		console.log('WE ARE USING SOCKETS!');
		console.log(socket.id);
		//all the socket code goes in here

		// socket.on('button_clicked', function(data){
		// 	console.log('someone clicked on the butotn! Reason:' + data.reason);
		// 	socket.emit('server_response', {response: "sockets are the best!"});
		// 	// socket.broadcast.emit("my_broadcast_event");
		// 	//io.emit('my_full_broadcast_event');
		// })

		socket.on('page_load', function(data){
			console.log('page_load');
			if(is_user(data.user) == true){
				socket.emit("existing_user", {errors: "This user already exists"})
			}else{
				users_array.push(data.user); //array instead of object
				//socket session
				socket.user = data.user;
				socket.room = 'General';
				//by default add new user to room1
				socket.join('General');
				// console.log(users_array);
				socket.broadcast.to('General').emit('update', {message: data.user +' has connected to this room'});

				socket.emit('updaterooms', rooms, 'General');

				socket.emit("load_messages", {current_user: data.user, messages: messages_array, room: 'General'} );
			}

		});


		socket.on("new_message", function(data){
			messages_array.push({name: data.user, message: data.message})
			// console.log('new message', messages_array);
			//broadcast to specific room 
			io.sockets.in(socket.room).emit('post_new_message', {new_message: data.message, user: data.user});
			// io.emit('post_new_message', {new_message: data.message, user: data.user})
		});

		socket.on('switchRoom', function(newroom){
			//leave current room in socket session
			console.log('hello switching rooms now');
			socket.leave(socket.room);
			socket.join(newroom);

			socket.emit('update', {message: 'you have connected to ' + newroom });
			//send message to old room that someone has left
			socket.broadcast.to(socket.room).emit('update', {message: socket.user +" has left the room"});

			//update socket session room title
			socket.room = newroom;

			socket.broadcast.to(newroom).emit('update', {message: socket.user+' has joined this room'});

			socket.emit('updaterooms', rooms, newroom);

		});

		//user disconnecting
		socket.on('disconnect', function(){
			//remove name from username array
			// console.log('disconnecting');
			for(var i=0; i<users_array.length; i++) {
				if(users_array[i] == socket.user){
					users_array.splice(i, 1);
				}
			}
			// socket.emit('disconnected', {message: 'hi'});
			socket.leave(socket.room);
			socket.broadcast.emit('update', {message: socket.user+ " has disconnected"});

		});

		socket.on('logout', function(){
			//remove name from username array
			// console.log('disconnecting');
			for(var i=0; i<users_array.length; i++){
				if(users_array[i] == socket.user){
					users_array.splice(i, 1);
				}
			}
			socket.emit('disconnected');
			socket.leave(socket.room);
			socket.broadcast.emit('update', {message: socket.user+ " has disconnected"});
		});

	})

	//root route to rend the index.ejs view
	app.get('/', function(req, res){
		res.render('index');
	})


}