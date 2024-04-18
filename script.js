const getList = async () => {
  let url = 'http://127.0.0.1:5000/estados';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.estados.forEach(estados => insertList(estados.nome, estados.uf))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
}

getList()


const postItem = async (newEstado, newUf) => {
  let url = 'http://127.0.0.1:5000/estado';

  try {
    // Move a declaração e atribuição de id_valida para dentro da função
    const id_valida = await validaEstado(document.getElementById('newUf').value);
    console.log("ID válido no post:", id_valida);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id_valida, nome: newEstado, uf: newUf })
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Sucesso:', data);
  
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// const postItem = async (  newEstado, newUf) => {
//   let url = 'http://127.0.0.1:5000/estado';

//   const id_valida = await validaEstado(document.getElementById('newUf').value);

//   fetch(url, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({id: id_valida, nome:newEstado, uf:newUf})    
//   })
//     .then((response) => response.json())
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }


const validaEstado = async (sigla) => {
  let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/` + sigla;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if (data != null) {
      console.log(data); // Aqui você pode manipular os dados conforme necessário
      return data.id;
    }
  } catch (error) {
    console.error('Erro ao verificar o estado:', error);
    return null; // Retorna null se ocorrer um erro na requisição
  }
}

const insertList = async ( nome, uf) => {
  id = await validaEstado(uf)

  if(nome === "" ) {
    alert("É necessário um NOME para cadastro do estado");
    return;
  }
  if(uf === "") {
    alert("É necessário um UF valido");
    return;
  }


  // Cria um array com os dados do item a ser inserido na lista
  var item = [id, nome, uf];

  // Obtém a referência da tabela onde os itens serão inseridos
  var table = document.getElementById('TabelaEstados');

  // Insere uma nova linha na tabela
  var row = table.insertRow();

  // Preenche as células da nova linha com os dados do item
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  // Insere o botão de remoção na última célula da nova linha
  insertButton(row.insertCell(-1));

  // Limpa os campos de entrada
  document.getElementById("newEstado").value = "";
  document.getElementById("newUf").value = "";

  // Remove o destaque do elemento anteriormente selecionado
  removeElement();
}


const newItem = async () => {
  let inputEstado = document.getElementById("newEstado");
  let inputUf = document.getElementById("newUf");
  let id_valida = await validaEstado(inputUf.value);

  console.log("id_valida",id_valida);
  validaEstado(inputUf.value);

  insertList( inputEstado.value, inputUf.value); 
  postItem( id_valida, inputEstado, inputUf)
  document.getElementById("newEstado").value= "";
  document.getElementById("newUf").value= ""; 
  
}

// const insertList = ( id ,nome, uf ) => {
//   var item = [localStorage.getItem('ibgeid') ,nome, uf]
//   var table = document.getElementById('TabelaEstados');
//   var row = table.insertRow();

//   for (var i = 0; i < item.length; i++) {
//     var cel = row.insertCell(i);
//     cel.textContent = item[i];
//   }
//   insertButton(row.insertCell(-1))
//   document.getElementById("newEstado").value= "";
//   document.getElementById("newUf").value= "";
//   removeElement()
// }



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