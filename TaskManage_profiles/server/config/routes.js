var express = require('express'), //ok
	routes = express.Router(), //ok
	passport = require('passport'), //ok for now
	User = require('../models/User.js'), // ok 
	tasks = require('../controllers/tasks.js'); // ok

	// ------------------ Register user ------------------------
	routes.post('/user/register', function(req, res) {
	  console.log(req.body)
	  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
	    if (err) {
	      return res.status(500).json({err: err});
	    }
	    passport.authenticate('local')(req, res, function () {
	      return res.status(200).json({status: 'Registration successful!'});
	    });
	  });
	});

	routes.post('/user/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) {
	      return res.status(500).json({err: err});
	    }
	    if (!user) {
	      return res.status(401).json({err: info});
	    }
	    req.logIn(user, function(err) {
	      if (err) {
	        return res.status(500).json({err: 'Could not log in user'});
	      }
	      res.status(200).json({status: 'Login successful!', user: user});
	      console.log(req.user)
	    });
	  })(req, res, next);
	});

	routes.get('/userinfo', function(req, res){
	  User.find({_id: req.user._id}, function (err, data) {
	    if(err) {
	      console.log('error!!')
	    } else {
	      res.json(data)
	    }
	  })
	  // console.log(req.user + '***** THIS IS THE REQUEST FOR THE USER *****')
	  // console.log(req.user._id + '!!!!!!!!!!!!!!!!!!!')
	  // console.log(req.user.username + '***************')
	})

	routes.get('/user/logout', function(req, res){
	  req.logout();
	  res.status(200).json({status: 'Bye!'});
	});

	routes.get('/user/isLoggedIn', function(req, res, next) {
	  if (req.user) {
	    console.log('user is logged in')
	    res.json({message: 'user is logged in'})
	    res.end()
	  } else {
	    console.log('user is not logged in')
	  }
	})



	routes.get('/getTasks', function(req, res) {
		tasks.find(req, res)
	})

	routes.post('/addTask', function(req, res){
		tasks.create(req, res)
	})

	routes.post('/removeTask', function(req, res) {
		tasks.remove(req,res)
	})









	module.exports = routes;