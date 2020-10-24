const Database = require('sqlite-async');

function execute(db) {
  return db.exec(`
    
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      password TEXT,
      UNIQUE(email)
    );
  
    CREATE TABLE IF NOT EXISTS orphanages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lat TEXT,
      lng TEXT,
      name TEXT,
      about TEXT,
      whatsapp TEXT,
      images TEXT,
      instructions TEXT,
      opening_hours TEXT,
      open_on_weekends TEXT
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city_name TEXT,
      state_name TEXT,
      lat TEXT,
      lng TEXT
    );
  `);
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute);
