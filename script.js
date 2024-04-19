const getList = async () => {
  let url = 'http://127.0.0.1:5000/estados';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.estados.forEach(async estados => insertList( await validaEstado(estados.uf), estados.nome, estados.uf  ))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
}

getList()


const postItem = async (id_valida ,newEstado, newUf) => {
  let url = 'http://127.0.0.1:5000/estado';

  try {
    // Move a declaração e atribuição de id_valida para dentro da função
   
    fetch(url, {
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
      return data.id; 
    }
  } catch (error) {
    console.error('Erro ao verificar o estado:', error);
    return null;
  }
}

const insertList = async (  id_valida ,nome, uf ) => {
  if(nome === "" ) {
    alert("É necessário um NOME para cadastro do estado");
    return;
  }
  if(uf === "") {
    alert("É necessário um UF valido");
    return;
  }

  var item = [id_valida, nome, uf];
  var table = document.getElementById('TabelaEstados');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertButton(row.insertCell(-1));
  document.getElementById("newEstado").value = "";
  document.getElementById("newUf").value = "";
  removeElement();
}


const newItem = async () => {
  let nome = document.getElementById("newEstado").value;
  let uf = document.getElementById("newUf").value;
  let id_valida = await validaEstado(uf);

  console.log("Nome:",nome, "Uf",uf , "id", id_valida);

  insertList(id_valida, nome, uf); 
  postItem(id_valida, nome, uf)
  document.getElementById("newEstado").value= "";
  document.getElementById("newUf").value= ""; 
  
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