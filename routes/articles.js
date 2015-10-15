var express = require('express');
var router = express.Router();

//db reference
var mongoose = require('mongoose');
var Article = require('../models/article'); 

// GET - show main articles page
router.get('/', function(req, res, next) {
    
    //use the Article model to query the Articles collection
	Article.find(function(err, articles) {
		if (err) {
			console.log(err);
			res.end(err);
		}
		else{
			//no error, we found articles
		    res.render('articles/index', {
			        //Pass in title
			        title: 'Articles',
			        //Pass in a variable 'articles' that is an array of articles
			        articles: articles
			    });
		}
	});
});

//GET add page - show blank form
router.get('/add', function(req, res, next) {
	res.render('articles/add', {
		title: 'Add a New Article'
	});
});

//POST add page - save the new article
router.post('/add', function(req,res,next) {
	Article.create( { 
		title: req.body.title,
		content: req.body.content
	}, function(err, Article){
		//did we get back an error or valid article object?
		if(err){
			console.log(err);
			res.end(err);
		}
		else {
			res.redirect('/articles');
		}
	});
});

//GET edit page - show form with article info
router.get('/:id', function(req, res, next) {
	
	//Get id
	var id = req.params.id;
	
	Article.findById(id, function (err, Article) {
		if(err){
			console.log(err);
			res.end(err);
		}
		else{
			res.render('articles/edit', {
			title: 'Edit Article',
			article: Article
			});
		}
	});
	
});

//POST edit page - update the article
router.post('/:id', function (req, res, next) {
	//Get id from url
	var id = req.params.id;
	
	//Create and populate article object
	var article = new Article( {
		_id: id,
		title: req.body.title,
		content: req.body.content
	});
	
	//Run the update using mongoose and our model
	Article.update( { _id: id}, article, function(err) {
		if(err){
			console.log(err);
			res.end(err);
		}
		else {
			res.redirect('/articles');
		}
	});
});

//Get delete article
router.get('/delete/:id', function(req, res, next) {
	//Get id from url
	var id = req.params.id;
	
	//Use article findById to find article and delete it 
	Article.remove( { _id: id}, function (err) {
		if(err){
			console.log(err);
			res.end(err);
		}
		else{
			res.redirect('/articles');
		}
	});

});


// make this public
module.exports = router;
