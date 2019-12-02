var Post = require('../models/post');
var User = require('../models/user');

module.exports = {
    create,
    delete: deleteOne
}

function create(req, res) {
    Post.findById(req.params.id, function(err, post) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        post.comments.push(req.body);
        post.save(function(err) {
            res.redirect(`/posts/${post._id}`);
        })
    })
}

function deleteOne(req, res) {
    let idx = req.params.idx;
    Post.findById(req.params.id, function(err, post) {
        console.log('HERE is THE COMMENTS: ' + post.comments);
        post.comments[idx].remove();
        post.save(function(err) {
            res.redirect(`/posts/${req.params.id}`);
        })
    })
}