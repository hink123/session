var Post = require('../models/post');
var User = require('../models/user');

module.exports = {
    create
}

function create(req, res) {
    Post.findById(req.params.id, function(err, post) {
        req.body.userName = req.user.name;
        post.comments.push(req.body);
        console.log('COMMENT HERE' + post.comments);
        post.save(function(err) {
            res.redirect(`/posts/${post._id}`);
        })
    })
}