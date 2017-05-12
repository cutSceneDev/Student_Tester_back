const express = require('express');
const router = express.Router();
const data = require('../data/index');

router.post('/database/authAdmin', async (request, response, next) => {

  let res;
  (await function hello() {
    return new Promise(resolve => {
      setTimeout(()=>{res='123';resolve()}, 500);
    })
  }())
  console.log(res);
  });




  // data.auth(function(result){
  //   response.send(result)
  // }, request.body)
//
// router.get('/database/:target', function(request, response, next){
//   console.log(request.query.id);
//   data.show(function(result){
//     response.send(result);
//   }, request.params, request.query);
// });
//
// router.post('/database/:target', function(request, response, next){
//   console.log(request.query.id);
//   data.add(function(result){
//     response.send(result);
//   }, request.params, request.query);
// });
//
// router.delete('/database/:target', function(request, response, next){
//   data.clear(function(result){
//     response.send(result);
//   }, request.params, request.query);
// });
//
// router.post('/login', function(request, response, next){
//   data.login(function(result){
//     response.send(result);
//   }, request.body.login, request.body.password);
// });

module.exports = router;
