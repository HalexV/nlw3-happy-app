const Database = require("./database/db");
const saveOrphanage = require("./database/saveOrphanage");
const updateOrphanage = require("./database/updateOrphanage");
const saveSettings = require("./database/saveSettings");
const updateSettings = require("./database/updateSettings");

module.exports = {
  index(req, res) {
    return res.render("index");
  },

  async orphanage(req, res) {
    const id = req.query.id;

    try {
      const db = await Database;

      const results = await db.all(`SELECT * FROM orphanages WHERE id="${id}"`);
      const orphanage = results[0];

      orphanage.images = orphanage.images.split(",");
      orphanage.firstImage = orphanage.images[0];

      if (orphanage.open_on_weekends == "0") {
        orphanage.open_on_weekends = false;
      } else {
        orphanage.open_on_weekends = true;
      }

      return res.render("orphanage", { orphanage });
    } catch (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    }
  },

  async orphanages(req, res) {
    try {
      const db = await Database;

      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { orphanages });
    } catch (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    }
  },

  createOrphanage(req, res) {
    return res.render("create-orphanage");
  },

  async saveOrphanage(req, res) {
    const fields = req.body;

    // validar se todos os campos estão preenchidos
    if (Object.values(fields).includes("")) {
      return res.send("Todos os campos devem ser preenchidos");
    }

    try {
      //salvar um orfanato
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      // redirecionamento
      return res.redirect("/orphanages");
    } catch (err) {
      console.log(error);
      return res.send("Erro no banco de dados!");
    }
  },

  async editOrphanage(req, res) {
    if (req.method === "POST") {
      const fields = req.body;

      // validar se todos os campos estão preenchidos
      if (Object.values(fields).includes("")) {
        return res.send("Todos os campos devem ser preenchidos");
      }

      try {
        //atualizar um orfanato
        const db = await Database;
        await updateOrphanage(db, {
          id: fields.orphanageId,
          lat: fields.lat,
          lng: fields.lng,
          name: fields.name,
          about: fields.about,
          whatsapp: fields.whatsapp,
          images: fields.images.toString(),
          instructions: fields.instructions,
          opening_hours: fields.opening_hours,
          open_on_weekends: fields.open_on_weekends,
        });

        // redirecionamento
        return res.redirect("/administration");
      } catch (err) {
        console.log(error);
        return res.send("Erro no banco de dados!");
      }
    } else {
      try {
        const orphanageId = req.query.id;
        const db = await Database;

        let orphanage = await db.get(
          `SELECT * FROM orphanages WHERE id=${orphanageId}`
        );

        orphanage.images = orphanage.images.split(",");

        orphanage = JSON.stringify(orphanage);

        return res.render("edit-orphanage", { orphanage });
      } catch (err) {
        console.log(err);
        return res.send("Erro no banco de dados!");
      }
    }
  },

  async deleteOrphanage(req, res) {
    try {
      const orphanageId = req.query.id;
      const db = await Database;

      const orphanages = await db.all("SELECT * FROM orphanages");

      // if invalid id and orphanages is empty, just redirect
      if (!orphanages.length) {
        return res.redirect("administration");
      }

      await db.run(`DELETE FROM orphanages WHERE id=${orphanageId}`);

      return res.redirect("administration");
    } catch (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    }
  },

  async administration(req, res) {
    try {
      const db = await Database;

      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("administration", { orphanages });
    } catch (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    }
  },

  async settings(req, res) {

    if (req.method === "POST") {
      
      try {
        const fields = req.body;

        const db = await Database;

        const results = await db.all("SELECT * FROM settings");

        if (!results.length) {
          console.log("entrei");
          await saveSettings(db, {
            city_name: fields.cityName,
            state_name: fields.stateName,
            lat: fields.lat,
            lng: fields.lng
          });

          return res.redirect('administration');
        }
        
        return res.redirect('administration');
      } catch (err) {
        
      }
      
      
    } else {
      try {
        const db = await Database;

        const results = await db.all("SELECT * FROM settings");

        let settingsData = results[0];

        if (!settingsData) {
          settingsData  = {haveData: false};

          settingsData = JSON.stringify(settingsData);

          return res.render('settings', { settingsData });
        }

        settingsData.haveData = true;

        settingsData = JSON.stringify(settingsData);

        return res.render('settings', { settingsData });

      } catch (err) {
        console.log(err);
        return res.send("Erro no banco de dados!");
      }


    }

  },
};
