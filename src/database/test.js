const Database = require('./db');

Database.then(async (db) => {
  // inserir dados na tabela
  await db.run(`
    INSERT INTO orphanages (
      lat,
      lng,
      name,
      about,
      whatsapp,
      images,
      instructions,
      opening_hours,
      open_on_weekends
    ) values (
      "-27.222633",
      "-49.6455874",
      "Lar das meninas",
      "Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.",
      "123123123",
      "https://images.unsplash.com/photo-1576024267263-70f1caffd6fe?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
      "Venha como se sentir a vontade e traga muito amor e paciência para dar.",
      "Horário de visitas Das 18h até 8h",
      "1"
    );
  `);

  // consultar dados da tabela
  const selectedOrphanages = await db.all("SELECT * FROM orphanages");
  console.log(selectedOrphanages);

  // consultar somente 1 orfanato, pelo ID
  const orphanage = await db.all('SELECT * FROM orphanages WHERE id="1"');
  console.log(orphanage);
});