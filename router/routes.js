const express = require('express');
const router = express.Router();
const { getAuth, getTests, getCorrectDb, compareResults, sendComparedDb, getStat } = require('../data/index');

router.post('/database/auth', async (request, response) => {
  response.send( await getAuth(request.body) );
});

router.get('/database/tests', async (request, response) => {
  response.send( await getTests(request.query) );
});

router.post('/database/results', async (request, response) => {
  const userFront = request.body.userData; //{name, group}
  const resultFront = request.body.resultData; //[{result, id}, {...}]
  const compared = await compareResults(resultFront, userFront, await getCorrectDb());
  sendComparedDb(compared);
  response.send(compared);
});

router.get('/database/stat', async (request, response) => {
  response.send( await getStat() );
});

module.exports = router;
