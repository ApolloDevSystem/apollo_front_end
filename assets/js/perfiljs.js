const inputs = [...document.getElementsByTagName('input')]
const btnEditar = document.getElementById('btnEditar')
const perfilForm = document.getElementById('perfil')

let inputsvalue = []

// Função para obter o valor de um cookie por nome -- chatgpt
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

const id = getCookie("id");

inputs.forEach(e => {
    e.setAttribute('disabled', "")
})

btnEditar.addEventListener('click', editar)

let i = 0
function editar(){
    //libera inputs
    inputs.forEach(e => {
        inputsvalue[i] = e.value
        console.log(inputsvalue[i])
        console.log(e.value)
        i++
        e.removeAttribute('disabled')
    })

    inputs.forEach(e => {
        e.addEventListener('input', () =>{ //mudança no input
            //trocar atributos do button
            btnEditar.innerHTML = 'salvar'
            btnEditar.classList.remove('btn-primary')
            btnEditar.classList.add('btn-danger')
            btnEditar.removeEventListener('click', editar);
            btnEditar.EditaraddEventListener('click', salvar);
        })
    })
    
}

function salvar(){
    //mandar dados
    const formData = new FormData(perfilForm)

    if(inputsvalue[0] !== formData.get('nome') || inputsvalue[1] !== formData.get('telefone') || inputsvalue[2] !== formData.get('endereco')|| inputsvalue[3] !== formData.get('desde')){
        //import('js/apiConsumo.js').then(({ editarCliente }) => {
            editarCliente(token2, formData, id)
        //})
    }
    
    //trocar atributos do button
    btnEditar.innerHTML = 'editar'
    btnEditar.classList.remove('btn-danger')
    btnEditar.classList.add('btn-primary')
    btnEditar.removeEventListener('click', salvar);
    btnEditar.addEventListener('click', editar);

    //tranca inputs
    inputs.forEach(e => {
        e.setAttribute('disabled', "")
    })
}

async function alimentacao(){
    //alimentação dos dados do cliente
    //import('js/apiConsumo.js').then(({ get }) => {
        let rota = 'getcliente/' + id
        get(token2, rota).then(data => {
            inputs[0].setAttribute('value', data.nome)
            inputs[1].setAttribute('value', data.telefone)
            inputs[2].setAttribute('value', data.endereco)
            inputs[3].setAttribute('value', data.desde)
        })
    //})
    //alimentação do histórico 
    //import('js/apiConsumo.js').then(({ get }) => {
        let rota1 = 'getclienteservico/' + id
        //começar dos mais recentes
        await get(token2, rota1).then(data => {
            for(let i = 0; i < data.length; i++){
                let rota2 = 'getservico/' + data[i].id_servico
                get(token2, rota2).then(e => {
                    const esq = document.getElementById('esq')
                    const dir = document.getElementById('dir')
                    const div = document.createElement('div')
                    div.classList.add('shadow-lg', 'bg-light', 'p-3', 'rounded', 'div-saltar', 'my-5')

                    const p = document.createElement('p')
                    p.innerHTML = 'serviço: <span class="text-dark">' + e.nome + '</span>'
                    p.classList.add('font-weight-bold', 'text-secondary')
                    const p1 = document.createElement('p')
                    p1.innerHTML = 'preço: <span class="text-dark">' + data[i].preco + '</span>'
                    p1.classList.add('font-weight-bold', 'text-secondary')
                    const p2 = document.createElement('p')
                    p2.innerHTML = 'descrição: <span class="text-dark">' + data[i].descricao + '</span>'
                    p2.classList.add('font-weight-bold', 'text-secondary')
                    const p3 = document.createElement('p')
                    p3.innerHTML = '<span class="text-dark">' + data[i].data_contratacao + '</span>'
                    p3.classList.add('font-weight-bold', 'text-secondary')

                    div.appendChild(p)
                    div.appendChild(p1)
                    div.appendChild(p2)
                    div.appendChild(p3)

                    if(i % 2 == 0){
                        esq.appendChild(div)
                    }else{
                        dir.appendChild(div)
                    }
                })
            }
        })
    //})
}

async function get(rota, dado) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/${rota}/'${dado}'`, {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': token
            },
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        throw error;
    }
}
