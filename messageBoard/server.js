var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './static')));

app.get("/", function(req, res){
	Message.find({}, false, true).populate('_comments').exec(function(err, messages){
	      res.render('index.ejs', {messages: messages});
	});
});

app.post("/message", function(req, res){
	var newMessage = new Message({name: req.body.name, message: req.body.message});
	newMessage.save(function(err){
		if(err){
			console.log(err);
			res.render('index.ejs', {errors: newMessage.errors});
		} else {
			console.log("You've Got Mail!");
			res.redirect('/');
		}
	})
})
app.post("/comment/:id", function(req, res){
	var message_id = req.params.id;
	Message.findOne({_id: message_id}, function(err, message){
		var newComment = new Comment({name: req.body.name, text: req.body.comment});
		newComment._message = message._id;
		Message.update({_id: message._id}, {$push: {"_comments": newComment}}, function(err){

		});
		newComment.save(function(err){
			if(err){
				console.log(err);
				res.render('index.ejs', {errors: newComment.errors});
			} else {
				console.log("comment added");
				res.redirect("/");
			}
		});
	});
});
app.listen(8000, function(){
	console.log("The World is Listening on port 8000");
});
mongoose.connect('mongodb://127.0.0.1/message_board', function(err, db){
	if(err){
		console.log("error here");
		console.log(err);
	}
});
var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
	name: String,
	message: String,
	_comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});
MessageSchema.path('name').required(true, 'Name cannot be blank');
MessageSchema.path('message').required(true, 'Message cannot be blank');
mongoose.model("Message", MessageSchema);
var Message = mongoose.model("Message");
var CommentSchema = new mongoose.Schema({
	name: String,
	text: String,
	_message: {type: Schema.Types.ObjectId, ref: 'Message'}
});
CommentSchema.path('name').required(true, 'Name cannot be blank');
CommentSchema.path('text').required(true, 'Comment cannot be blank');
mongoose.model("Comment", CommentSchema);
var Comment = mongoose.model("Comment");


// var express = require('express');
// var bodyParser = require('body-parser');
// var path = require('path');
// var mongoose = require('mongoose');

// port = 8000;

// var app = express();

// app.use(bodyParser.urlencoded({ extended: true }));

// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');

// var connection = mongoose.connect('mongodb://localhost/MongoMsg');

// // -------------------------Associations--------------------------

// var Schema = mongoose.Schema;

// var PostSchema = new mongoose.Schema({
//  text: {type: String, required: true }, 
//  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
// }, {timestamps: true });

// var CommentSchema = new mongoose.Schema({
//  _post: {type: Schema.Types.ObjectId, ref: 'Post'},
//  text: {type: String, required: true }
// }, {timestamps: true });

// mongoose.model('Post', PostSchema);
// mongoose.model('Comment', CommentSchema);

// var Post = mongoose.model('Post');
// var Comment = mongoose.model('Comment');



// // -------------------------------------------
// app.get("/", function(req, res){
// 	Message.find({}, false, true).populate('_comments').exec(function(err, messages){
// 	      res.render('index.ejs', {messages: messages});
// 	});
// });

// app.post("/message", function(req, res){
// 	var newMessage = new Message({name: req.body.name, message: req.body.message});
// 	newMessage.save(function(err){
// 		if(err){
// 			console.log(err);
// 			res.render('index.ejs', {errors: newMessage.errors});
// 		} else {
// 			console.log("Nice Job, have a cookie");
// 			res.redirect('/');
// 		}
// 	})
// })
// app.post("/comment/:id", function(req, res){
// 	var message_id = req.params.id;
// 	Message.findOne({_id: message_id}, function(err, message){
// 		var newComment = new Comment({name: req.body.name, text: req.body.comment});
// 		newComment._message = message._id;
// 		Message.update({_id: message._id}, {$push: {"_comments": newComment}}, function(err){

// 		});
// 		newComment.save(function(err){
// 			if(err){
// 				console.log(err);
// 				res.render('index.ejs', {errors: newComment.errors});
// 			} else {
// 				console.log("comment added");
// 				res.redirect("/");
// 			}
// 		});
// 	});
// });

// app.listen(8000, function(){
// 	console.log("The World is listening on port 8000");
// });

// mongoose.connect('mongodb://127.0.0.1/MongoMsg', function(err, db){
// 	if(err){
// 		console.log("You've got errors!");
// 		console.log(err);
// 	}
// });
// var Schema = mongoose.Schema;
// var MessageSchema = new mongoose.Schema({
// 	name: String,
// 	message: String,
// 	_comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
// });
// MessageSchema.path('name').required(true, 'Name cannot be blank');
// MessageSchema.path('message').required(true, 'Message cannot be blank');
// mongoose.model("Message", MessageSchema);
// var Message = mongoose.model("Message");
// var CommentSchema = new mongoose.Schema({
// 	name: String,
// 	text: String,
// 	_message: {type: Schema.Types.ObjectId, ref: 'Message'}
// });
// CommentSchema.path('name').required(true, 'Name cannot be blank');
// CommentSchema.path('text').required(true, 'Comment cannot be blank');
// mongoose.model("Comment", CommentSchema);
// var Comment = mongoose.model("Comment");
