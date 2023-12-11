(function () {
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


    function editar() {
        let i = 0
        //libera inputs 
        inputs.forEach(e => {
            inputsvalue[i] = e.value
            i++
            e.removeAttribute('disabled')
        })

        inputs.forEach(e => {
            e.addEventListener('input', () => { //mudança no input
                //trocar atributos do button
                btnEditar.textContent = 'salvar'
                btnEditar.classList.remove('btn-primary')
                btnEditar.classList.add('btn-danger')
                btnEditar.addEventListener('click', salvar);
            })
        })

    }

    btnEditar.addEventListener('click', editar)

    function salvar() {
        //mandar dados

        criarModal("FUNÇÃO AINDA NÃO IMPLEMENTADA")
        return
        const formData = new FormData(perfilForm)

        if (inputsvalue[0] !== formData.get('nome') || inputsvalue[1] !== formData.get('telefone') || inputsvalue[2] !== formData.get('endereco') || inputsvalue[3] !== formData.get('desde')) {
            editarCliente(token2, formData, id)

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

    alimentacao()
    async function alimentacao() {
        alimentaDados()
        alimentaEnderecos()
        /////kkkkkk mo trampo pra pegar os serviços vai vendo kkkk

    }

    async function alimentaDados() {
        let rota = 'cliente'
        await get(rota, id).then(data => {
            document.getElementById('nome').setAttribute('value', data.nome)
            document.getElementById('numero').setAttribute('value', data.numero)
            document.getElementById('email').setAttribute('value', data.email)
            document.getElementById('cpf').setAttribute('value', data.cpf)
        })
    }

    async function alimentaEnderecos() {
        let rota = 'endereco-cliente'
        await get(rota, id).then(data => {
            if (data.length == 1) {
                const endAdc = document.getElementById('endAdc')
                endAdc.innerHTML = ""
                enderecoAdcVazio(endAdc)
                console.log("teste")
            }
            let i = 0
            data.forEach(datinha => {
                if (i == 0) comp = ''
                else comp = i
                document.getElementById('CEP' + comp).setAttribute('value', datinha.CEP)
                document.getElementById('UF' + comp).setAttribute('value', datinha.UF)
                document.getElementById('cidade' + comp).setAttribute('value', datinha.cidade)
                document.getElementById('logradouro' + comp).setAttribute('value', datinha.logradouro)
                document.getElementById('numeroEnd' + comp).setAttribute('value', datinha.numero)
                document.getElementById('bairro' + comp).setAttribute('value', datinha.bairro)
                document.getElementById('complemento' + comp).setAttribute('value', datinha.complemento)
                document.getElementById('referencia' + comp).setAttribute('value', datinha.referencia)
                i++
            })

        })
    }
})();


//alimentação dos serviços prestados

/* 
let rota1 = 'servico'
        //começar dos mais recentes
        await get(rota1, id).then(data => {
            for (let i = 0; i < data.length; i++) {
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

                    if (i % 2 == 0) {
                        esq.appendChild(div)
                    } else {
                        dir.appendChild(div)
                    }
                })
            }
        })
        //})

*/