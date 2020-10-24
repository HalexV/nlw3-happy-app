const Database = require("../database/db");

const loadSettings = async (req, res, next) => {
  try {
    const db = await Database;

    const results = await db.all("SELECT * FROM settings");

    let settingsData = results[0];

    if (!settingsData) {
      settingsData = { haveData: false };


      res.locals.settingsData = settingsData;

      next();
    } else {
      settingsData.haveData = true;
  
  
      res.locals.settingsData = settingsData;
  
      next();
      
    }

  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { loadSettings };
