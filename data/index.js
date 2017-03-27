function showTables(dataRes) {
  const mysql = require('mysql');
  let sql = mysql.createConnection({
    host      : 'localhost',
    user      : 'artyr',
    password  : 'pass',
    database  : 'MyData'
  });

  let queryString = 'SELECT * FROM users';
  sql.connect();
  sql.query(queryString, (error, response, fields) => {
    if (error) throw error;
    sql.end();
    dataRes(response);
  });
};

module.exports = showTables;
