const mysql = require('mysql');
const fs = require('fs');
const { RSA_NO_PADDING } = require('constants');

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const conn = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  prot: conf.port,
  database: conf.database
});

module.exports = {
  conn: () => {
    return conn;
  }
  
};