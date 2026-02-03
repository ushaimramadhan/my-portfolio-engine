const { Pool } = require('pg');
require('dotenv').config();

console.log("Cek User:", process.env.DB_USER);
console.log("Cek Password:", process.env.DB_PASSWORD);
console.log("Cek Host:", process.env.DB_HOST);


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error(' Koneksi Database Gagal:', err.message);
  } else {
    console.log('Berhasil Terhubung ke Database PostgreSQL');
  }
});

module.exports = pool;