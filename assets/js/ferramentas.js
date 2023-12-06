function mascaras() {
    $('#inputCPF').inputmask('999.999.999-99', { reverse: true });
    $('#inputCep').inputmask('99999-999');
    $('#inputTelefone').inputmask('(99) 9 9999-9999');
    $('#inputDiaria').inputmask({
        alias: 'numeric',
        radixPoint: ',',
        groupSeparator: '.',
        autoGroup: true,
        digits: 2,
        numericInput: true,
        placeholder: '0',
        prefix: 'R$ ',
        rightAlign: false,
        onBeforeMask: function (value) {
            return value.replace('.', '');
        }
    });
}

function criarModal(info) {
    const fechar = document.getElementById('fechar-modal')
    const cardModal = document.getElementById('card-modal')

    cardModal.style.display = "flex"
    document.getElementById('main-content').classList.add('blur')

    const mensagemErro = document.getElementById('mensagem-erro')
    mensagemErro.textContent = info
    mensagemErro.style = "font-weight: bold"

    fechar.addEventListener('click', () => {
        cardModal.style.display = "none"
        document.getElementById('main-content').classList.remove('blur')
    })
}

function apiCep(cep, comp = "") {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Erro na requisição. Status: ${response.status}`
                );
            }
            return response.json();
        })
        .then((data) => {
            if (data.erro == true) {
                document.getElementById('inputUF' + comp).value = "";
                document.getElementById('inputCidade' + comp).value = "";
                document.getElementById('inputBairro' + comp).value = "";
                document.getElementById('inputLogradouro' + comp).value = "";
                document.getElementById('inputCep' + comp).style = "border-color: red; border-width: 1px;"
                //window.alert("CEP INEXISTENTE")
                criarModal("CEP INEXISTENTE")
                document.getElementById('inputCep').value = ""
            } else {
                document.getElementById('inputCep' + comp).style = "border-color: none; border-width: 1px;"
                document.getElementById('inputUF' + comp).value = data.uf;
                document.getElementById('inputCidade' + comp).value = data.localidade;
                document.getElementById('inputBairro' + comp).value = data.bairro;
                document.getElementById('inputLogradouro' + comp).value = data.logradouro;
            }
        })
        .catch((error) => {
            document.getElementById('inputCep' + comp).style = "border-color: red; border-width: 1px;"
            console.error("Erro ao obter informações do CEP:", error);
            //window.alert("CEP INEXISTENTE")
            criarModal("CEP INEXISTENTE")
            document.getElementById('inputCep' + comp).value = ""
        });
}