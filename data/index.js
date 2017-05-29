const mysql = require('mysql');
let sql = mysql.createConnection({
  host      : 'localhost',
  user      : 'artyr',
  password  : 'pass',
  database  : 'mydata'
});

export function getAuth(frontData) {
  return new Promise( (resolve, reject) => {
    let queryString = `SELECT login, password FROM users`;
    sql.query(queryString, (error, response) => {
      response.forEach(user => {
        if(user.login.toLowerCase() === frontData.login.toLowerCase() && user.password.toLowerCase() === frontData.password.toLowerCase()) resolve(true);
      });
      resolve(false);
    });
  });
}
export function getTests(frontData) {
  return new Promise( (resolve, reject) => {
    let queryString = `SELECT id_question, question, answer1, answer2, answer3, answer4 FROM testing`;
    sql.query(queryString, (error, response) => {
      if(error) console.log(error);
      resolve(response);
    });
  });
}

export function getDbResults(frontData) {
  return new Promise ( (resolve, reject) => {
    let queryString = `SELECT correct FROM testing`;
    sql.query(queryString, (error, response) => {
      if(error) console.log(error);
      resolve(response);
    })
  })
}

export function calcResults(dataResults, frontResults) {
  return new Promise ( (resolve, reject) => {
    console.log(dataResults.length, frontResults.length);
    if (dataResults.length !== frontResults.length) reject('Data Front and MYSQL is different');
    let result = {
      total: dataResults.length,
      correct: 0,
      wrong: 0
    }
    for (let index in frontResults) {
      //console.log(frontResults[index], dataResults[index].correct)
      if (frontResults[index] === dataResults[index].correct) result.correct++;
      else result.wrong++;
    }
    console.log(result);
    resolve(result)
  })
}

export function setResults(userInfo, results) {
  return new Promise ( (resolve, reject) => {
    //console.log(userInfo);
    let queryString = `INSERT INTO results VALUES(NULL, '${userInfo.group}', '${userInfo.name}', '${results.correct}', '${results.total}')`
    console.log(queryString);
    sql.query(queryString, (error, response) => {
      if(error) console.log(error);
      resolve(response);
    })
  })
}

  // if (!variables.login && !variables.password) res = false;
  // else {
  //   let queryString = `SELECT login, password FROM users`;
  //   sql.query(queryString, (error, response) => {
  //     response.forEach((user) => {
  //       if(user.login === variables.login && user.password === variables.password) res = true;
  //       else res = false;
  //
  //   })
  // }

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
