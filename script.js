const getList = async () => {
  let url = 'http://127.0.0.1:5000/estados';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.estados);
      data.estados.forEach(estados => insertList(estados.id,estados.nome, estados.uf))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
}

getList()

const postItem = async ( newEstado, newUf) => {
  let url = 'http://127.0.0.1:5000/estado';

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({nome:newEstado.value, uf:newUf.value})
  })  
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

// const newItem = () => {
//   let inputEstado = document.getElementById("newEstado").value;
//   let inputUf = document.getElementById("newUf").value;
  

//   if ((inputEstado === '') && (inputUf === '')) {
//     alert("Para o cadastro do Estado será necessário informar Estado ou UF desejado!");
//   } else {
//     insertList(inputEstado, inputUf)
//     postItem(inputEstado, inputUf)
//     alert("Estado adicionado com Sucesso adicionado!")
//   }
// }

const newItem = () => {
  let inputEstado = document.getElementById("newEstado");
  let inputUf = document.getElementById("newUf");
  
  if ((inputEstado === '') || (inputUf === '')) {
    alert("Para o cadastro do Estado será necessário informar Estado e UF desejado!");
  } else {
    postItem(inputEstado, inputUf)
      .then(data => {
        insertList(data.id, inputEstado, inputUf);
        alert("Estado adicionado com sucesso!");
      })
      .catch(error => {
        console.error('Erro ao adicionar estado:', error);
        alert("Erro ao adicionar estado. Por favor, tente novamente.");
        document.getElementById("newEstado").value= "";
        document.getElementById("newUf").value= "";       
      });
  }
}

const insertList = ( id, nome, uf ) => {
  var item = [id ,nome, uf]
  var table = document.getElementById('TabelaEstados');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newEstado").value= "";
  document.getElementById("newUf").value= "";
  removeElement()
}
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("X");
  span.title = "Clique aqui para remover o estado"
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
      console.log(div[0])
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

const deleteItem = async (estado_id) => {
  let url = 'http://127.0.0.1:5000/estado?id=' + estado_id ;
  data = {
    id: estado_id
  }

  fetch(url, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  }) 
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    }); 
}