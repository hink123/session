var Post = require('../models/post');
var User = require('../models/user');
var request = require('request');
const rootURL = 'http://api.spitcast.com';

module.exports = {
    index,
    new: newPost,
    create,
    show,
    delete: deleteOne,
    edit
}

function index(req, res) {
    Post.find({}, function(err, posts) {
        res.render('posts/index', {
            user: req.user,
            posts
        })
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

function deleteOne(req, res) {
    Post.deleteOne({_id: req.params.id}, function(err) {
        res.redirect('/posts');
    })
}

function edit(req, res) {
    Post.findById(req.params.id, function(err, post) {
        res.render('posts/edit', {
            user: req.user, 
            post
        });
    })
}
