var express = require('express');
var router = express.Router();
var postsCtlr = require('../controllers/posts');


/* GET users listing. */
router.get('/', isLoggedIn, postsCtlr.index);
router.post('/new', isLoggedIn, postsCtlr.new);
router.post('/', isLoggedIn, postsCtlr.create);
router.get('/:id', isLoggedIn, postsCtlr.show);
router.delete('/:id', isLoggedIn, postsCtlr.delete);
router.get('/:id/edit', isLoggedIn, postsCtlr.edit);

module.exports = router;


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}