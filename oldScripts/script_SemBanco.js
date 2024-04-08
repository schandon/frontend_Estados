const localStorageKey = 'infoEstados'


function validaSeEstadoExiste(){
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let inputValue = document.getElementById('iptAddEstado').value
  let exists = values.find( x => x.name == inputValue)
  return !exists ? false : true
}

function addEstado_(){
  let input = document.getElementById('iptAddEstado');
  input.style.border = '';
  
  //Validação input
  if(!input.value){
    input.style.border = '3px solid red';
    alert('Para adicionar o estado é necessário utilizar o Nome , UF ou ID do estado.');
  }
  else if(validaSeEstadoExiste()){
    alert('Estado já cadastrado.');
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
  input.value = '';
}

function showEstados(){
    let values = JSON.parse(localStorage.getItem(localStorageKey));
    let list = document.getElementById('listaEstado');
    list.innerHTML= '';
    for (let i=0; i<values.length; i++) {
      list.innerHTML += `<li>${values[i]['estado']} <button id='btnRemoveEstado' onclick='deleteEstado("${values[i]['estado']}")'> Delete </button></li>`
    }
}

function deleteEstado(data){
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let index = values.findIndex( x => x.name == data )
  values.splice(index, 1)
  localStorage.setItem(localStorageKey, JSON.stringify(values))
  showEstados()
}

showEstados()