"use strict"

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	db = require('./models/index');

  require("locus");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//Home
app.get('/', function(req,res){
	res.render('posts/index');
});


//////////	AUTHOR ROUTES	//////////

//Index
app.get('/authors', function(req,res){
	db.Author.findAll().done(function(err,authors){
		res.render('authors/index', {allAuthors: authors});
	});
});

//New
app.get('/authors/new', function(req,res){
	res.render('authors/new');
});


//Create
app.post('/authors', function(req,res){
	db.Author.create({
		name: req.body.author.name,
	}).done(function(err){
		if(err){
			var errMsg = "Something went wrong!";
			res.render('authors/new', {errMsg:errMsg});
		}
	else {
		res.redirect('/authors');
	}
	});
});


//Show
app.get('/authors/:id/posts', function(req,res){
	var id = req.params.id;
	db.Author.find(id).done(function(err,author){
		author.getPosts().done(function(err,posts){
      // eval(locus)
		res.render('authors/show', {allPosts:posts,author:author});
		});
	});
});


//Edit
app.get('/authors/:id/edit', function(req,res){
	var id = req.params.id;
	db.Author.find(id).done(function(err,author){
		res.render('authors/edit', {author:author});
	});
});


// Update
app.put('/authors/:id', function(req,res){
	var id = req.params.id;
	db.Author.find(id).done(function(err,author){
		author.updateAttributes({
			name: req.body.author.name
		}).done(function(){
			res.redirect('/authors');
		});
	});
});

//Delete
app.delete('/authors/:id', function(req,res){
  var id = req.params.id;
  db.Author.find(id).done(function(err,author){      
    db.Post.destroy({
      where:{
        AuthorId:author.id
      }
    }).done(function(err){
        author.destroy().done(function(err){
        res.redirect('/authors');
      });  
    });
  });
});



//////////	POST ROUTES	//////////


//Index
app.get('/posts', function(req,res){
	db.Post.findAll().done(function(err,posts){
		res.render('posts/index', {allPosts: posts});
	});
});

//New
app.get('/posts/:id/new', function(req,res){
  var id = req.params.id;
	res.render('posts/new', {id:id});
});


//Create
app.post('/posts', function(req,res){
	db.Post.create({
		title: req.body.post.title,
		body: req.body.post.body,
    AuthorId: req.body.post.AuthorId
	}).done(function(err){
		if(err){
			var errMsg = "Something went wrong!";
			res.render('posts/new', {errMsg:errMsg,title:post.title,body:post.body});
		}
	else {
		res.redirect('/posts');
	}
	});
});


//Show
app.get('/posts/:id/', function(req,res){	
	var id = req.params.id;
	db.Post.find(id).done(function(err,post){
		res.render('posts/show', {title:post.title,body:post.body});
	});
});


//Edit
app.get('/posts/:id/edit', function(req,res){
	var id = req.params.id;
	db.Post.find(id).done(function(err,post){
		res.render('posts/edit', {post:post});
	});
});


// Update
app.put('/posts/:id', function(req,res){
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

// Delete
app.delete('/posts/:id', function(req,res){
  var id = req.params.id;
  db.Post.find(id).done(function(err,post){
    post.destroy().done(function(err){
      res.redirect('/posts');
    });
  });
});


app.listen(3000);
