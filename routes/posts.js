var express = require('express');
var router = express.Router();
var postsCtlr = require('../controllers/posts');


/* GET users listing. */
router.get('/', isLoggedIn, postsCtlr.index);
router.post('/new', isLoggedIn, postsCtlr.new);

module.exports = router;


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}