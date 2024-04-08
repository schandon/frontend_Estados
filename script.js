const getList = async () => {
  let url = 'http://127.0.0.1:5000/estado';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.estados.forEach(estado => insertList(estado.nome, estado.uf))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    console.log(data.estados);
}

getList()

const postItem = async (inputEstado, inputUf) => {
  const formData = new FormData();
  formData.append('nome', inputEstado);
  formData.append('uf', inputUf);


  let url = 'http://127.0.0.1:5000/produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const newItem = () => {
  let inputEstado = document.getElementById("newEstado").value;
  let inputUf = document.getElementById("newUf").value;
  

  if ((inputEstado === '') && (inputUf === '')) {
    alert("Para o cadastro do Estado será necessário informar Estado ou UF desejado!");
  } else {
    insertList(inputEstado, inputUf)
    postItem(inputEstado, inputUf)
    alert("Estado adicionado com Sucesso adicionado!")
  }
}


const insertList = (nameEstado, uf ) => {
  var item = [nameEstado, uf ]
  var table = document.getElementById('listaEstado');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newEstado").value = "";
  document.getElementById("newUf").value = "";

  removeElement()
}
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}