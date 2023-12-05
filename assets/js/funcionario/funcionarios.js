
carregar()
function carregar() {
    const divFunc = document.querySelector("#func");
    funcionarios(divFunc)
    const divAdm = document.querySelector("#adm");
    adms(divAdm)
}

function funcionarios(div) {
    //ajax para servidor php
    fetch('http://127.0.0.1:8000/api/funcionarios', {
        method: 'GET',
        headers: {
            'X-CSRF-TOKEN': token
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => {
            alimentarFunc(data, div)
        })
        .catch(error => {
            console.error(error);
        });
}

function adms(div) {
    //ajax para servidor php
    fetch('http://127.0.0.1:8000/api/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => {
            alimentarAdm(data, div)
        })
        .catch(error => {
            console.error(error);
        });
}

function alimentarFunc(data, div) {
    //opção de criar
    if (data.length === 0)
        vazio(div)
    data.forEach(funcionario => {
        funcionario.id = funcionario.IDFuncionario
        bloco(div, funcionario)
    })
}

function alimentarAdm(data, div) {

    data.forEach(adm => {
        adm.id = adm.id
        bloco(div, adm)
    })
}

//cria o bloco de funcioario -- adm ou func
function bloco(div, dados_func) {
    let col = document.createElement("div");
    col.classList.add('col-md-3', 'mb-5', 'div-saltar', 'mx-3', 'p-0');

    let card = document.createElement("div");
    card.classList.add('card', 'h-100', 'border-0');

    let cardBody = document.createElement("div");
    cardBody.classList.add('card-body', 'd-flex', 'align-items-center');
    //adcionar event listener para o perfil do funcionario (perfil é generico para func and cliente)
    let img = document.createElement('img');
    img.classList.add('img-fluid', 'mb-4', 'rounded-circle');
    img.src = "img/apollo color.png";
    img.style.width = "32px"
    img.style.height = "32px"

    let infoDiv = document.createElement("div");
    infoDiv.classList.add('mx-4')

    let nome = document.createElement("h5");
    nome.classList.add('card-title');
    nome.textContent = dados_func.nome;

    let telefone = document.createElement('p');
    telefone.classList.add('card-text', 'text-secondary');
    telefone.textContent = "Tel: " + formatarTelefone(dados_func.numero);

    infoDiv.appendChild(nome);
    infoDiv.appendChild(telefone);

    cardBody.appendChild(img);
    cardBody.appendChild(infoDiv);
    card.appendChild(cardBody);
    col.appendChild(card);

    //redirecionando para perfil
    col.addEventListener('click', () => {
        document.cookie = "id=" + dados_func.id + "; path=/";

        let perfil = "componentes/perfil.html";
        let perfiljs = "assets/js/perfiljs.js"
        render(document.getElementById('main-content'), perfil, perfiljs)
    })

    div.appendChild(col);
}

function formatarTelefone(numero) {
    // Remove qualquer caractere não numérico
    let numeroLimpo = numero.replace(/\D/g, '');

    // Aplica a máscara de telefone
    if (numeroLimpo.length === 11) {
        // Formato com DDD e 9 dígitos
        return numeroLimpo.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
    } else if (numeroLimpo.length === 10) {
        // Formato com DDD e 8 dígitos
        return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        // Número inválido
        return 'Número de telefone inválido';
    }
}

// botao para redirecionar ao cadastro
function vazio(div) {
    const divCol = document.createElement("div");
    divCol.className = "col-md-4 mb-5 div-saltar mx-3 p-0";

    const divCard = document.createElement("div");
    divCard.className = "card h-100 border-0";

    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body d-flex flex-column align-items-center justify-content-md-center pt-4";

    const paragraph = document.createElement("p");
    paragraph.className = "titulo mb-3";
    paragraph.textContent = "SEM FUNCIONÁRIOS CADASTRADOS";

    const button = document.createElement("button");
    button.className = "btn btn-success";
    button.textContent = "Cadastrar";
    button.addEventListener('click', () => cadastrarFunc())

    divCardBody.appendChild(paragraph);
    divCardBody.appendChild(button);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard);
    div.appendChild(divCol);
}