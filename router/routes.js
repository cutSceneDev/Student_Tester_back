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
  //console.log(correctData, correctFront)
  data.setResults(request.body.userInfo, correctFront);
  response.send(correctFront);
});

module.exports = router;
