var express = require('express');
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var router = express.Router();

var insertDemo = function(db, callback) {
   db.collection('users').insertOne( {
      "userID" : "Demo",
      "password" : "passed",
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Demo created");
    callback();
})};

module.exports = router;



router.get('/',function(req,res){
	res.render('../pages/index');
});

router.get('/about',function(req,res){
	res.send('about');
});

router.get('/contact');

router.post('/contact');

router.get('/visit', function(req,res) {
req.session.nvisit = (req.session.nvisit >= 0) ? req.session.nvisit += 1 : 1;
if (req.session.nvisit > 1) {
res.send('Welcome back! This is your ' + req.session.nvisit + ' visits');
} else {
res.send('Welcome!');
 }
});

router.get('/addDemo',function(req,res){
  MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDemo(db, function() {
      db.close();
  });
});
	res.send('Account:Demo created');
});
