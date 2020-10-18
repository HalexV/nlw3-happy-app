
function updateSettings(db, settings) {
  return db.run(`
  UPDATE settings SET
    city_name = "${settings.city_name}",
    state_name = "${settings.state_name}",
    lat = "${settings.lat}",
    lng = "${settings.lng}"
  WHERE id = "${settings.id}";
  
`);
}

module.exports = updateSettings;
