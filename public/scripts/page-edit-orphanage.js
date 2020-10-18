// create map
const map = L.map("mapid").setView([-27.222633, -49.6455874], 15);

// create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on('click', (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;
  
  // remove icon
  marker && map.removeLayer(marker);
  
  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);

});

// adicionar o campo de fotos
function addPhotoField({ forceAdd = false }) {
  // pegar o container de fotos #images
  const container = document.querySelector('#images');
  // pegar o container para duplicar .new-image
  const fieldsContainer = document.querySelectorAll('.new-upload');
  // realizar o clone da última imagem adicionada
  const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

  // verificar se o campo está vazio, se sim, não adicionar ao container de imagens
  const input = newFieldContainer.children[0];

  if (input.value == "" && !forceAdd) {
    return
  }

  // limpar o campo antes de adicionar ao container de imagens.
  input.value = "";

  // adicionar o clone ao container de imagens
  container.appendChild(newFieldContainer);

}

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll('.new-upload');

  if(fieldsContainer.length < 2) {
    // limpar o valor do campo
    span.parentNode.children[0].value = "";

    return
  }

  // deletar o campo
  span.parentNode.remove();
}

// select yes or no

function toggleSelect(event) {
  // retirar a class .active (dos botões)
  document.querySelectorAll('.button-select button')
  .forEach(button => button.classList.remove('active'));
  // pegar o botão clicado
  // colocar a class .active
  const button = event.currentTarget;
  button.classList.add('active');

  // atualizar o meu input hidden com o valor selecionado
  const input = document.querySelector('[name="open_on_weekends"]');

  input.value = button.dataset.value;
}

function validate(event) {
  // validar se lat e lng estão preenchidos
  return
  event.preventDefault();

  alert('Selecione um ponto no mapa');
}

async function loadOrphanageData() {
  let orphanage = document.querySelector('span[data-orphanage]').dataset.orphanage;
  const form = document.querySelector('#edit-orphanage');

  orphanage = JSON.parse(orphanage);

  form.orphanageId.value = orphanage.id;
  
  form.lat.value = orphanage.lat;
  form.lng.value = orphanage.lng;

  // reset the view to the position of the orphanage
  map.setView([orphanage.lat, orphanage.lng], 15);

  // add marker of the orphanage
  marker = L.marker([orphanage.lat, orphanage.lng], { icon }).addTo(map);

  form.name.value = orphanage.name;
  form.about.value = orphanage.about;
  form.whatsapp.value = orphanage.whatsapp;

  if (orphanage.images.length === 1) {
    form.images.value = orphanage.images;
  } else {
    for(let i = 1; i < orphanage.images.length; i++) {
      addPhotoField({forceAdd: true});
    }

    const formImages = document.querySelectorAll('input[name="images"]');

    for(let i = 0; i < orphanage.images.length; i++) {
      formImages[i].value = orphanage.images[i];
    }

  }

  form.instructions.value = orphanage.instructions;
  form.opening_hours.value = orphanage.opening_hours;
  form.open_on_weekends = orphanage.open_on_weekends;

  document.querySelectorAll('.button-select button')
  .forEach(button => button.classList.remove('active'));

  orphanage.open_on_weekends == 1 ? document.querySelector('button[data-value="1"]').classList.add('active') : document.querySelector('button[data-value="0"]').classList.add('active');

}