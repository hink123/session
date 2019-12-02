var Post = require('../models/post');
var User = require('../models/user');
var request = require('request');
const rootURL = 'http://api.spitcast.com';

module.exports = {
    index,
    new: newPost,
    create,
    show
}

function index(req, res) {
    Post.find({}, function(err, posts) {
        console.log("look here" + posts);
        res.render('posts/index', {
            user: req.user,
            posts
        })
    })
}

function newPost(req, res) {
    res.render('posts/new', {
        user: req.user
    });
}

function create(req, res) {
    var post = new Post(req.body);
    post.user = req.user;
    post.userName = post.user.name;
    post.save(function(err) {
        if(err) return res.render('posts/new', {
            user: req.user
        });
        res.redirect('/posts');
    })
}

function show(req, res) {
    Post.findById(req.params.id, function(err, post) {
        res.render('posts/show', {
            user: req.user,
            post
        });
    })
}