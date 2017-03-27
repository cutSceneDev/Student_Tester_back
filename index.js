const express = require('express');
const app = express();
const port = 3000;
const routes = require('./router/routes');
//const bodyParser = require('body-parser');

app.listen(port, ()=>console.log('Server up!!!'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//app.use(function bodyParser.json());

app.use('/', routes);
