const db = require('../config/db');

const createTables = async () => {
  try {
    //Tabel users (untuk admin)
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabel "users" siap.');

    //Tabel projects (portofolio)
    await db.query(`
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          image_url VARCHAR(255),
          tech_stack TEXT[],
          repository_link VARCHAR(255),
          demo_link VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log('Tabel "projects" siap.');

    //Tabel Messages (Pesan dari Contact Form)
    await db.query(`
        CREATE TABLE IF NOT EXISTS messages (
          id SERIAL PRIMARY KEY,
          sender_name VARCHAR(100) NOT NULL,
          sender_email VARCHAR(100) NOT NULL,
          message_body TEXT NOT NULL,
          is_read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log('Tabel "messages" siap.');

    console.log('Semua tabel berhasil dibuat!');
    process.exit();
  } catch (err) {
    console.error('Gagal membuat tabel:', err.message);
  }
};

createTables();