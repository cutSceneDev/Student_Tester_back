const mysql = require('mysql');
let sql = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',   // your name
  password  : 'pass',       // your pass
  database  : 'mydata'
});

import moment from 'moment';

export { getAuth, getTests, getCorrectDb, compareResults, sendComparedDb, getStat };

function getAuth(frontData) {
  return new Promise( (resolve, reject) => {
    let queryString = `SELECT login, password FROM users`;
    sql.query(queryString, (error, response) => {
      response.forEach(user => {
        if(user.login.toLowerCase() == frontData.login.toLowerCase() && user.password.toLowerCase() == frontData.password.toLowerCase()) {
          resolve(true);
        }
      });
      resolve(false);
    });
  });
}

function getTests(frontSet) {
  return new Promise( (resolve, reject) => {
    let queryString = `SELECT id_question, question, answer1, answer2, answer3, answer4 FROM testing`;
    sql.query(queryString, (error, response) => {
      if(error) console.log(error);
      resolve( filterTests(response, frontSet.qua) );
    });
  });
}

function getCorrectDb() {
  return new Promise ( (resolve, reject) => {
    let queryString = `SELECT id_question, correct FROM testing`;
    sql.query(queryString, (error, response) => {
      resolve(response);
    })
  })
}

function compareResults(resultFront, userFront, correctResult) {
  return new Promise ( (resolve, reject) => {
    console.log(resultFront, correctResult);
    let correctCount = 0;
    const sortedCorrect = correctResult.sort((prev, next) => {
      return (prev.id_question > next.id_question) ? 1 : -1;
    })
    for (let result of resultFront) {
      for (let correct of correctResult) {
        if (result.id == correct.id_question) {
          if (result.result == correct.correct) {
            correctCount++;
          }
          break;
        }
      }
    }
    resolve({
      name: userFront.name,
      group: userFront.group,
      total: resultFront.length,
      correct: correctCount,
      wrong: resultFront.length - correctCount,
      mark: markCalculator(correctCount / resultFront.length)
    });
  })
}

function sendComparedDb(results) {
  return new Promise ( (resolve, reject) => {
    let time = moment().format('HH:mm DD-MM-YYYY');
    let queryString = `INSERT INTO results VALUES(NULL, '${results.group}', '${results.name}', '${results.correct}', '${results.total}', '${time}')`
    sql.query(queryString, (error, response) => {
      if(error) console.log(error);
      resolve(response);
    })
  })
}

function getStat() {
  return new Promise ( (resolve, reject) => {
    let queryString = `SELECT * FROM results`;
    sql.query(queryString, (error, response) => {
      if(error) console.log(error);
      resolve(response);
    })
  })
}

function filterTests(testsPre, quality) {
  let testsSorted = [];
  let uniqueTests = [];
  for (let i = 0; i < quality; i++ ) {
    let randTest = Math.round( Math.random() * (testsPre.length - 1));
    if ( check(randTest) ) {
      i--;
    } else {
      uniqueTests.push(randTest);
      testsSorted.push(testsPre[randTest]);
    }
  }
  function check(current) {
    for (let el in uniqueTests) {
      if (uniqueTests[el] == current) return true;
    }
    return false;
  }
  return testsSorted;
}

function markCalculator(coefficient, criterion) {
  if (!criterion) {       //если не пришел критерий
    criterion = {
      '0.95': '11',
      '0.9': '10',
      '0.85': '9',
      '0.8': '8',
      '0.75': '7',
      '0.65': '6',
      '0.5': '5',
      '0.35': '4',
      '0.2': '3'
    }
  }
  for (let coef in criterion) {
    if (coefficient > coef) {
      return criterion[coef];
    }
  }
  return '2';
}
