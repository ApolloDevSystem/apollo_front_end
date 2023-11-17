function criarTabela(div){
    let container = document.querySelector('#div-table')
    if(container === null){
        container = document.createElement('div')
        container.setAttribute('id', 'div-table')
        container.classList.add('container', 'shadow-lg', 'bg-light', 'pt-2');
    }
    
    const pesquisaBtn = pesquisa(container)
    
    //const titulo = document.createElement('div')
    //titulo.textContent = "CLIENTES"
    //container.appendChild(titulo)

    /* 
    
    const row = document.createElement('div')
    row.classList.add('row', 'justify-content-center')
    pesquisaBtn.addEventListener('click', () => {
        container.removeChild(row)
        const input = document.querySelector('#pesquisa')
        criarTabela(div, token, input.value)
    })
    */

    const tbody = document.createElement('tbody')
    const rota = 'getclientes'
    get(token, rota).then(data => {
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
                    //render(div, '../perfil.html', 'js/perfil.js')
                    //nao renderiza mais, mas muda de pagina
                    location.href = "perfil.html"
                })
                const tdNome = document.createElement('td')
                const tdTelefone = document.createElement('td')
                const tdEndereco = document.createElement('td')
                tdNome.textContent = e.nome
                tdTelefone.textContent = e.telefone
                tdEndereco.textContent = e.endereco
                linha.appendChild(tdNome)
                linha.appendChild(tdTelefone)
                linha.appendChild(tdEndereco)
                tbody.appendChild(linha)   
            }
        })
    })

    table.appendChild(tbody)
    col.appendChild(table)
    row.appendChild(col)
    container.appendChild(row)
    div.appendChild(container);
}