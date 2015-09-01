/*
 * Post Resource
 */

var Post = require('mongoose').model('Post');
var User = require('mongoose').model('User');

// JWT
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "secret";
var requireAuth = expressJwt({secret: secret}, function (req, res) {
                    console.log(req.user)
                    if (!req.user.admin) return res.send(401);
                      res.send(200);
                    }
                  );

module.exports = function(app) {

  // LOGIN
  app.post('/api/users/login', function (req, res) {
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    if (!(req.body.email === 'test@test.com' && req.body.password === 'password')) {
      res.send(401, 'Wrong user or password');
      return;
    }

    var profile = {
      email: req.body.email
    };

    // We are sending the profile inside the token
    var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

    res.json({ token: token });
  })
  
  // INDEX
  app.get('/api/posts', requireAuth, function (req, res) {
    console.log(req.user)
    Post.find().sort('-created_at').exec(function(err, posts) {
      if (err) { return res.status(404).send(err) };
      res.status(200).json(posts); // return all nerds in JSON format
    });
  });

  // CREATE
  app.post('/api/posts', function (req, res) {
    var post = new Post({
        body: req.body.body
      , room_name: req.body.roomName
    });
    console.log(post);
    post.save(function (err, post) {
      console.log('post saved')
      if (err) { return res.send(err) };
      res.status(201).json(post) 
    });
  });

  // SHOW
  app.get('/api/posts/:id', function (req, res) {
    Post.findById(req.params.id, function(err, post) {
      console.log('blah')
      if (err) { return res.status(404).send(err) };
      res.status(200).json(post); 
    });
  });

  // UPDATE
  app.put('/api/posts/:id', function (req, res) {
    Post.findOneAndUpdate({ _id: req.params.id}, req.query.post, function (err, post) {
      if (err) { return res.send(err) }
      res.status(200).json(post)
    });
  });

  // DESTROY
  app.delete('/api/posts/:id', function (req, res) { 
    console.log("hello")
    Post.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) { return res.send(err) }
      res.status(200);
    });
  });
}