const localStorageKey = 'infoEstados'

function addEstado(){
  let input = document.getElementById('iptAddEstado');
  
  //Validação input
  if(!input.value){
    alert('Para adicionar o estado é necessário utilizar o Nome , UF ou ID do estado.');
  }
  else{
    //adicionando no local Storage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({
      estado : input.value
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
  }
  showEstados();
}

function showEstados(){
    let values = JSON.parse(localStorage.getItem(localStorageKey));
    let list = document.getElementById('listaEstado');
    list.innerHTML= '';
    for (let i=0; i<values.length; i++) {
      list.innerHTML += `<li>${values[i]['estado']} <button></button></li>`
    }
}
 showEstados()
// function deleteEstado(){

// }