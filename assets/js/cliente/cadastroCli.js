let formCriado = false
const divEnderecoAdicional = document.getElementById('novoEnd');


const btnAddEnd = document.getElementById('btnAddEndereco').addEventListener('click', function () {
    if (!formCriado) {
        const endereco = "componentes/endereco.html"
        render(divEnderecoAdicional, endereco, null)
        document.getElementById('btnAddEndereco').textContent = "Remover Endereço Adicional"
        formCriado = true
    } else {
        divEnderecoAdicional.innerHTML = ""
        document.getElementById('btnAddEndereco').textContent = "Adicionar outro endereço"
        formCriado = false
    }
});
