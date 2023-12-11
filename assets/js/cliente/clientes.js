carregarTabela()
function carregarTabela(pesquisaInp = null){
    let container = document.querySelector('#table')
   
    //implementando pesquisa
    const pesqBtn = document.querySelector('#pesqBtn')
    pesqBtn.addEventListener('click', () =>{
        const pesqBtn = document.querySelector('#pesqInp')
        pesquisaInp = pesqBtn.value
        console.log(pesquisaInp)
        carregarTabela(pesquisaInp)
    })


    
    const tbody = document.createElement('tbody')
    const rota = 'clientes'
    fetch('http://127.0.0.1:8000/api/'+rota,{
        method: 'GET',
        headers: {
            'X-CSRF-TOKEN': token
        },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        if(data.length === 0){
            vazio(container, "SEM CLIENTES CADASTRADOS", cadastrarCli)
            return
        }
        data.forEach(e => {
            if(pesquisaInp === null){
                pesquisaInp = ""
            }
            if(e.nome.includes(pesquisaInp)){
                const linha = document.createElement('tr')
                linha.setAttribute('style', 'cursor: pointer; user-select: none')
                linha.setAttribute('scope', 'row')
                linha.addEventListener('click', (event) =>{
                    event.preventDefault()
                    document.cookie = "id=" + e.IDCliente + "; path=/";
             
                    //aplicar mudança para perfil de cliente
                    clientePerfil = "componentes/perfil/perfil.html"
                    clientePerfiljs = "assets/js/perfil/perfilCli.js"
                    render(document.getElementById('main-content'), clientePerfil, clientePerfiljs)
                })
                const tdNome = document.createElement('td')
                const tdCpf = document.createElement('td')
                const tdTelefone = document.createElement('td')
                const tdEmail = document.createElement('td')
                tdNome.textContent = e.nome
                tdCpf.textContent = e.cpf
                tdTelefone.textContent = e.numero
                tdEmail.textContent = e.email
                linha.appendChild(tdNome)
                linha.appendChild(tdCpf)
                linha.appendChild(tdTelefone)
                linha.appendChild(tdEmail)
                tbody.appendChild(linha)   
            }
        })
    })
    .catch(error => { 
        console.error(error);
    });

    container.appendChild(tbody)
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