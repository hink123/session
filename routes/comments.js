var express = require('express');
var router = express.Router();
var commentsCtlr = require('../controllers/comments');

router.post('/posts/:id/comments', isLoggedIn, commentsCtlr.create);

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/');
  }