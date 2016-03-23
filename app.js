require('./db');
var express = require('express');
var app = express();
//mongoose
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
//templating
var handlebars = require('express-handlebars')
	.create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
//access request body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/movies', function(req, res){
	var findObject = {};
	if(req.query.director !== undefined && req.query.director !== ""){
		findObject = {
			director: req.query.director
		};
	}
  Movie.find(findObject, function(err, result, count){
		res.render('movies', {movies:result});
  });
});

app.get('/movies/add', function(req, res){
	res.render('addMovie');
});

app.post('/movies/add', function(req,res){
	var newMovie = new Movie({
		title : req.body.title,
		director : req.body.director,
		year : req.body.year
	});
	newMovie.save(function(err, movie, count){
		if(err === null){
			res.redirect('/movies');
		}else{
			console.log(err, movie);
		}
	});
});

app.listen(3000);
console.log("Starting on port 3000");
