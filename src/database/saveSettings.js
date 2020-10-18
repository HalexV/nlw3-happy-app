function saveSettings(db, settings) {
  return db.run(`
  INSERT INTO settings (
    city_name,
    state_name,
    lat,
    lng
  ) values (
    "${settings.city_name}",
    "${settings.state_name}",
    "${settings.lat}",
    "${settings.lng}"
  );
`);
}

module.exports = saveSettings;
