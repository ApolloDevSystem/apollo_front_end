carregarTabela()
function carregarTabela(pesquisaInp = null){
    let container = document.querySelector('#table')
   
    //implementando pesquisa
    const pesqBtn = document.querySelector('#butpesq')
    pesqBtn.addEventListener('click', () =>{
        const pesqBtn = document.querySelector('#pesq')
        pesquisaInp = pesqBtn.value
        console.log(pesquisaInp)
        carregarTabela(pesquisaInp)
    })


    
    const tbody = document.createElement('tbody')
    const rota = 'servicos'
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
            if(e.tiposervico.includes(pesquisaInp)){
                const linha = document.createElement('tr')
                linha.setAttribute('style', 'cursor: pointer; user-select: none')
                linha.setAttribute('scope', 'row')
                linha.addEventListener('click', (event) =>{
                    event.preventDefault()
                    document.cookie = "id=" + e.id + "; path=/";
                    div.innerHTML = " "
                    //aplicar mudança para perfil de serviço (todos os dados)
                })
                const tdTiposervico = document.createElement('td')
                const tdData = document.createElement('td')
                const tdCliente = document.createElement('td')
                const tdValor = document.createElement('td')
                const tdSituacao = document.createElement('td')
                tdTiposervico.textContent = e.tiposervico
                tdData.textContent = e.data
                tdCliente.textContent = e.numero
                tdValor.textContent = e.valor
                tdSituacao.textContent=e.situacao
                linha.appendChild(tdTiposervico)
                linha.appendChild(tdData)
                linha.appendChild(tdCliente)
                linha.appendChild(tdValor)
                tbody.appendChild(linha)   
            }
        })
    })
    .catch(error => { 
        console.error(error);
    });

    container.appendChild(tbody)
}