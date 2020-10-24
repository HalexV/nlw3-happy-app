function loadSettingsData() {
  const form = document.querySelector('#settings-form');
  let settingsData = document.querySelector('span[data-settings]').dataset.settings;

  settingsData = JSON.parse(settingsData);

  if (settingsData.haveData) {
    form.cityName.value = settingsData.city_name;
    form.stateName.value = settingsData.state_name;
    form.lat.value = settingsData.lat;
    form.lng.value = settingsData.lng;
  }

}