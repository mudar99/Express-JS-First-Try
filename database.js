// database.js
const mysql2 = require("mysql2");
const { promisify } = require("util");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE,
  Promise: global.Promise,
});

const poolQuery = promisify(pool.query).bind(pool);

module.exports = { poolQuery };
