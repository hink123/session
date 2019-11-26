var Post = require('../models/post');
var User = require('../models/user');

module.exports = {
    index
}

function index(req, res) {
    res.render('posts/index', {
        user: req.user
    })
}