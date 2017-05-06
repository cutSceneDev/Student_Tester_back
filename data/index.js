const mysql = require('mysql');
let sql = mysql.createConnection({
  host      : 'localhost',
  user      : 'artyr',
  password  : 'pass',
  database  : 'MyData'
});

export function auth (res, variables) {
  if (!variables.login && !variables.password) res(false);
  else {
    let queryString = `SELECT login, password FROM users`;
    sql.query(queryString, (error, response) => {
      if (error) res(error.toString());
      response.forEach((user) => {
        if(user.login === variables.login && user.password === variables.password) res(true);
        else res(false);
      })
    })
  }
}

// exports.show = function show(resSend, params, query) {
//   let queryString = `SELECT ${query.id || '*'} FROM ${params.target}`;
//   console.log(queryString);
//   sql.query(queryString, (error, response) => {
//     if (error) resSend(error.toString());
//     resSend(response);
//   });
// };
//
// exports.add = function add(resSend, params, query) {
//   let queryString = `INSERT INTO ${params.target}(question, answer1, answer2, answer3, answer4, correct) VALUES ${query.body.id}`
//   console.log(queryString);
//   sql.query(queryString, (error, response) => {
//     if (error) resSend(error.toString());
//     resSend(response);
//   });
// };
//
// exports.login = function login(resSend, login, password) {
//   let queryString = `SELECT login, password FROM users`;
//   console.log(queryString);
//
//   sql.query(queryString, (error, response) => {
//     if (error) resSend(error.toString());
//     let res = false;
//     response.forEach((user) => {
//       if (user.login === login && user.password == password){
//         res = true;
//       }
//     })
//     resSend(res);
//   });
// }
//
