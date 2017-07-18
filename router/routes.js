const express = require('express');
const router = express.Router();
const { getAuth, getTests, getDbResults, calcResults, setResults, getStat } = require('../data/index');

router.post('/database/auth', async (request, response) => {
  response.send( await getAuth(request.body) );
});

router.get('/database/tests', async (request, response) => {
  response.send( await getTests(request.query) );
});

router.post('/database/results', async (request, response) => {
  //console.log(request.body);
  let correctData = (await getDbResults(request.body.questData.tests));
  //console.log(correctData, request.body.questData.results, request.body.userData);
  let correctFront = (await calcResults(correctData, request.body.questData.results, request.body.userData));
  //console.log('my-------------------',request.body.userData, 'my-------------------',correctFront)
  setResults(correctFront);
  response.send(correctFront);
});

router.get('/database/stat', async (request, response) => {
  response.send( await getStat() );
});

module.exports = router;
