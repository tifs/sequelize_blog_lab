"use strict"

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = ('method-override'),
	db = require('./models/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//Home
app.get('/', function(req,res){
	res.render('posts');
});


//////////	AUTHOR ROUTES	//////////

//Index
app.get('/authors', function(req,res){
	db.Author.findAll().done(function(err,posts){
		res.render('author/index', {allAuthors: author});
	});
});

//New
app.get('/authors/new', function(req,res){
	res.render('author/new');
});


//Create
app.post('/authors', function(req,res){
	db.Author.create({
		name: req.body.post.name,
	}).done(function(err){
		if(err){
			var errMsg = "Something went wrong!";
			res.render('authors/new', {errMsg:errMsg});
		}
	else {
		res.redirect('/author/index');
	}
	});
});


//Show
app.get('/authors/:id/books', function(req,res){
	var id = req.params.id;
	db.Author.find(id).done(function(err,author){
		author.getPosts().done(function(err,posts){
		res.render('author/show', {allPosts:posts,author:author});
		});
	});
});


//Edit
app.get('/authors/:id/edit', function(req,res){
	var id = req.params.id;
	db.Author.find(id).done(function(err,author){
		res.render('author/edit', {author:author});
	});
});


// Update
app.put('authors/:id', function(req,res){
	var id = req.params.id;
	db.Author.find(id).done(function(err,author){
		author.updateAttributes({
			name: req.body.author.name
		}).done(function(){
			res.redirect('/authors');
		});
	});
});



//////////	POST ROUTES	//////////


//Index
app.get('/posts', function(req,res){
	db.Post.findAll().done(function(err,posts){
		res.render('post/index', {allPosts: posts});
	});
});

//New
app.get('/posts/:id/new', function(req,res){
	res.render('post/new', {id:id,title:"",body:""});
});


//Create
app.post('/posts/:id', function(req,res){
	db.Post.create({
		title: req.body.post.title,
		body: req.body.post.body
	}).done(function(err){
		if(err){
			var errMsg = "Something went wrong!";
			res.render('post/new', {errMsg:errMsg,title:title,body:body});
		}
	else {
		res.redirect('/index');
	}
	});
});


//Show
app.get('/posts/:id/', function(req,res){
	var id = req.params.id;
	db.Post.find(id).done(function(err,post){
		res.render('post/show', {title:title,body:body});
		});
	});
});


//Edit
app.get('/posts/:id/edit', function(req,res){
	var id = req.params.id;
	db.Post.find(id).done(function(err,post){
		res.render('author/edit', {title:title});
	});
});


// Update
app.put('posts/:id', function(req,res){
	var id = req.params.id;
	db.Post.find(id).done(function(err,post){
		post.updateAttributes({
			title: req.body.post.title,
			body: req.body.post.body
		}).done(function(){
			res.redirect('/posts');
		});
	});
});