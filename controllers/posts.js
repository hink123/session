var Post = require('../models/post');
var User = require('../models/user');
var request = require('request');
const rootURL = 'http://api.spitcast.com';

module.exports = {
    index,
    new: newPost
}

function index(req, res) {
    res.render('posts/index', {
        user: req.user
    })
}

function newPost(req, res) {
    res.render('posts/new', {
        user: req.user
    });
}