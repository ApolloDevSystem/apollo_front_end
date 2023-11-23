window.onload = carregarTabela()
function carregarTabela(){
    let container = document.querySelector('#table')
   
    let pesquisaInp = null
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
                    document.cookie = "id=" + e.id + "; path=/";
                    div.innerHTML = " "
                    //aplicar mudança para perfil de cliente
                })
                const tdNome = document.createElement('td')
                const tdCpf = document.createElement('td')
                const tdTelefone = document.createElement('td')
                const tdEndereco = document.createElement('td')
                tdNome.textContent = e.nome
                tdCpf.textContent = e.cpf
                tdTelefone.textContent = e.numero
                tdEndereco.textContent = e.endereco
                linha.appendChild(tdNome)
                linha.appendChild(tdCpf)
                linha.appendChild(tdTelefone)
                linha.appendChild(tdEndereco)
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