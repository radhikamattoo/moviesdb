/*
Radhika Mattoo, rm3485@nyu.edu
Applied Internet Tech Spring 2016
Homework 5
*/
var mongoose = require('mongoose');

//create a schema
var Movie = new mongoose.Schema({
  title: String,
  director:String,
  year:Number
});

//register the schema and connect to the database
mongoose.model('Movie', Movie);
mongoose.connect('mongodb://localhost/hw05');
