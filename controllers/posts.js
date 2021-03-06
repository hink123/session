var Post = require('../models/post');
var User = require('../models/user');
var request = require('request');
const rootURL = 'http://api.spitcast.com/';

module.exports = {
    index,
    new: newPost,
    create,
    show,
    delete: deleteOne,
    edit,
    update
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
    var countyName = req.body.county_name;
    var spotName = req.body.spot_name;
    request(rootURL + 'api/spot/all', function(err, response, body) {
        var parsedAll = JSON.parse(body);
        var forecastData;
        for(let i = 0; i < parsedAll.length; i++) {
            if((parsedAll[i].county_name === countyName) && (parsedAll[i].spot_name === spotName)) {
                forecastData = parsedAll[i];
            }
        }
        var spotId = JSON.stringify(forecastData.spot_id);
        request(`${rootURL}api/spot/forecast/${spotId}/?dcat=week`, function(err, response, body) {
            var parsedSpot = JSON.parse(body);
            var sevenDays = [];
            for(let i = 0; i < parsedSpot.length; i++) {
                if(parsedSpot[i].hour === "10AM") {
                    sevenDays.push(parsedSpot[i]);
                }
            }
            res.render('posts/new', {
                user: req.user,
                sevenDays,
                spotName
            });
        })
    })
}

function create(req, res) {
    var post = new Post(req.body);
    post.user = req.user;
    post.userName = post.user.name;
    sevenDays = JSON.parse(req.body.sevenDays);
    spotName = JSON.parse(req.body.spotName);
    post.save(function(err) {

        if(err) return res.render('posts/new', {
            user: req.user,
            sevenDays,
            spotName
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

function update(req, res) {
    Post.findById(req.params.id, function(err, post) {
        post.description = req.body.description;
        post.save(function(err) {
            res.redirect('/posts');
        })
    })
}
