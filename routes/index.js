var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page : './sub/main.ejs' });
});

// res.render 파일던져줌
// res.send 데이터를 던져줌
module.exports = router;
