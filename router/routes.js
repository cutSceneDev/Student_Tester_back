const express = require('express');
const router = express.Router();
const data = require('../data/index');

router.post('/database/auth', async (request, response) => {
  response.send( await data.getAuth(request.body) );
});

router.get('/database/tests', async (request, response) => {
  response.send( await data.getTests(request.query) );
});

router.post('/database/results', async (request, response) => {
  let correctData = (await data.getDbResults(request.body.results));
  let correctFront = (await data.calcResults(correctData, request.body.results, request.body.userInfo));
  //console.log(correctFront);
  data.setResults(request.body.userInfo, correctFront);
  response.send(correctFront);
});

router.get('/database/stat', async (request, response) => {
  //console.log( await data.getStat() );
  response.send( await data.getStat() );
});

module.exports = router;
