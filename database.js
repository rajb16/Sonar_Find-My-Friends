const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'elvis.rowan.edu',
  user: 'dragon57',
  password: '1Yellowhouse!',
  database: 'Find My Friend',
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,
});

module.exports = pool.promise(); 