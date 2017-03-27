const express = require('express');
const router = express.Router();
const data = require('../data/index');

router.get('/', function(reqest, response, next){
  data(function(dataRes) {
    response.send(dataRes);
  });
});

router.get('/:table/:row', function(reqest, response, next){
  req.query.table
  req.query.row 
})

module.exports = router;
