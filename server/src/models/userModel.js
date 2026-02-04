const db = require('../config/db');
const bcrypt = require('bcryptjs');

const UserModel = {
  // Cari user berdasarkan email (untuk login)
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  // Buat user baru (Password otomatis di-hash disini)
  createUser: async (email, password) => {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // simpan ke DB
    const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email, created_at
    `;
    const result = await db.query(query, [email, hashedPassword]);
    return result.rows[0];
  }
};

module.exports = UserModel;