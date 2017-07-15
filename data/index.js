const mysql = require('mysql');
let sql = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : '',
  database  : 'mydata'
});

import moment from 'moment';

export { getAuth, getTests, getDbResults, calcResults, setResults, getStat };

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

function getDbResults(frontData) {
  return new Promise ( (resolve, reject) => {
    let queryString = `SELECT id_question, correct FROM testing`;
    sql.query(queryString, (error, response) => {
      if(error) console.log(error);
      let res = [];
      for (let elem in frontData) {
        for (let item in response) {
          if (frontData[elem].id === response[item].id_question) res.push({id_question: response[item].id_question, correct: response[item].correct});
        }
      }
      resolve( res );
    })
  })
}

function calcResults(dataResults, frontResults, frontUserInfo) {
  return new Promise ( (resolve, reject) => {
    if (dataResults.length !== frontResults.length) reject('Data Front and MYSQL is different');
    let result = {
      name: frontUserInfo.name,
      group: frontUserInfo.group,
      total: frontResults.length,
      correct: 0,
      wrong: 0,
      mark: 0
    }
    for (let index in frontResults) {
      if (frontResults[index].answer == dataResults[index].correct)
        result.correct++;
      else result.wrong++;
    }
    result.mark = markCalculator(result);
    resolve( result );
  })
}

function setResults(userInfo, results) {
  return new Promise ( (resolve, reject) => {
    let time = moment().format('HH:mm DD-MM-YYYY');
    let queryString = `INSERT INTO results VALUES(NULL, '${userInfo.group}', '${userInfo.name}', '${results.correct}', '${results.total}', '${time}')`
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

function markCalculator(statistic, criterion) {
  if (!statistic.correct || !statistic.total) {
    return new Error('Incorrect arguments');
  };
  let coefficient = statistic.correct / statistic.total;
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
