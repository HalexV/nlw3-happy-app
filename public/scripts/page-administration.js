function areYouSure(event) {
  if (!confirm("Você tem certeza que quer excluir este orfanato?")) {

    event.preventDefault();
  }
  
}