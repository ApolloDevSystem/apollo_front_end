mascaras()

(function() {
let formCriado = false;
const divEnderecoAdicional = document.getElementById('novoEnd');

checkboxFormat("#checkboxes")

const btnAddEnd = document.getElementById('btnAddEndereco').addEventListener('click', function () {
    if (!formCriado) {
        const endereco = "componentes/endereco.html"
        render(divEnderecoAdicional, endereco, "assets/js/endereco/endereco.js")
        document.getElementById('btnAddEndereco').textContent = "Remover Endereço Adicional"
        formCriado = true
    } else {
        divEnderecoAdicional.innerHTML = ""
        document.getElementById('btnAddEndereco').textContent = "Adicionar outro endereço"
        formCriado = false
    }
});

function checkboxFormat(grupo) {
    // Adiciona um event listener aos checkboxes para garantir que apenas um seja selecionado
    const checkboxes = document.querySelector(grupo).querySelectorAll('.form-check-input');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            checkboxes.forEach(function (otherCheckbox) {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.removeAttribute('required');
                }
            });

            if (checkbox.checked) {
                checkbox.setAttribute('required', true);
            } else {
                checkbox.removeAttribute('required');
            }

            if (checkbox.checked) {
                // Se o checkbox está marcado, definimos o tipoEndereco
                const tipoEnderecoInput = document.getElementById(`tipoEndereco`);
                console.log(checkbox.value)
                tipoEnderecoInput.value = checkbox.value;
            }
        });
    });
}

function obterDadosFormularioFuncionario() {
    const inputNome = document.getElementById('inputNome').value
    const inputCPF = document.getElementById('inputCPF').value
    const inputTelefone = document.getElementById('inputTelefone').value
    const inputEmail = document.getElementById('inputEmail').value
    const inputDiaria = document.getElementById('inputDiaria').value

    const funcionario = {
        nome: inputNome,
        numero: inputTelefone,
        email: inputEmail,
        cpf: inputCPF,
        diaria: inputDiaria.replace('R$', '').replace('.', '').replace(',', '.'),
        enderecos: null
    }

    console.log('Dados do formulário:', funcionario);

    return funcionario
}

function obterDadosFormularioEndereco(num = "") {
    // Obtém os valores dos inputs
    const cepGet = document.getElementById('inputCep' + num).value;
    const uf = document.getElementById('inputUF' + num).value;
    const cidade = document.getElementById('inputCidade' + num).value;
    const bairro = document.getElementById('inputBairro' + num).value;
    const logradouro = document.getElementById('inputLogradouro' + num).value;
    const numero = document.getElementById('inputNumero' + num).value;
    const referencia = document.getElementById('inputReferencias' + num).value;

    // Obtém o valor do checkbox selecionado
    let tipoEndereco;
    const checkboxCasa = document.getElementById('checkCasa' + num);
    const checkboxPredio = document.getElementById('checkPredio' + num);
    const checkboxEmpresa = document.getElementById('checkEmpresa' + num);

    if (checkboxCasa.checked) {
        tipoEndereco = checkboxCasa.value;
    } else if (checkboxPredio.checked) {
        tipoEndereco = checkboxPredio.value;
    } else if (checkboxEmpresa.checked) {
        tipoEndereco = checkboxEmpresa.value;
    } else {
        window.alert("selecione um complemento")
        return null
    }

    // Monta um objeto com os dados
    const endereco = {
        cep: cepGet,
        uf: uf,
        cidade: cidade,
        bairro: bairro,
        logradouro: logradouro,
        numero: numero,
        referencia: referencia,
        complemento: tipoEndereco
    };

    // Envia os dados para a API (substitua esta parte pelo código de envio real)
    console.log('Dados do formulário:', endereco);
    // Chame sua função de envio para a API aqui, passando o objeto "dados"

    return endereco
}

//EVENTOS PARA API
document.getElementById('btnCadastrar').addEventListener('click', async function () {
    // Verifica se o formulário é válido
    const formulario = document.querySelector('form');
    if (formulario.checkValidity()) {

        const funcionario = obterDadosFormularioFuncionario();

        if (funcionario) {
            // Obtém os dados de endereço e verifica se há pelo menos um endereço
            const enderecoPrincipal = obterDadosFormularioEndereco();
            let enderecoAdicional = null
            if (formCriado)
                enderecoAdicional = obterDadosFormularioEndereco('1');


            if (enderecoPrincipal || enderecoAdicional) {
                // Cria o objeto a ser enviado para a API
                funcionario.enderecos = [enderecoPrincipal, enderecoAdicional].filter(Boolean)
                const dadosParaAPI = {
                    funcionario: funcionario,
                };

                // Aqui você deve chamar sua função de envio para a API, passando o objeto "dadosParaAPI"
                console.log('Dados a serem enviados para a API:', dadosParaAPI);

                post('funcionario', dadosParaAPI)
            } else {
                window.alert("Preencha pelo menos um endereço");
            }
        }
        //com endereço e cliente criado, agora eu seto os endereços por funcionario


    } else {
        // Se o formulário não for válido, você pode adicionar lógica para lidar com isso
        console.log('Formulário inválido');
    }
});


/*
DOCUMENTAÇÃO DE CRIAÇÃO DE FUNCIONÁRIO
1- CRIA O ENDEREÇO PRINCIPAL
2- CRIA O ENDEREÇO ADICIONAL (SE HOUVER)
3- CRIA O FUNCIONÁRIO
4- CRIA O ENDERECO_FUNCIONARIO PARA CADA ENDEREÇO, TENDO COMO BASE O ID DO FUNCIONÁRIO CRIADO
*/

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


async function post(rota, dado) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/criar-'+rota, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            mode: 'cors',
            body: JSON.stringify(dado)
        });
        console.log('Resposta do servidor:', response);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;  // Isso permite que o erro seja propagado para o código que chamou a função post
    }
}

//===================================================================
//checa existencia do cpf
const inputCpf = document.getElementById('inputCPF');
inputCpf.addEventListener('keyup', async () => {
    if (inputCpf.value.length === 14) {
        try {
            const existe = await get('funcionarioCpf', inputCpf.value);
            console.log(existe.funcionarios.length)
            if (existe.funcionarios.length !== 0) {
                // window.alert('cpf existente')

                /* tentativa de fazer um componente modal (chato)
                renderModal(document.getElementById('main-content'), "componentes/modais/modalErroCadastro.html", "assets/js/modal/modalErro.js", () => {
                    document.getElementById('mensagem-erro').textContent = "CPF JA CADASTRADO NO SISTEMA"
                })
                */
                criarModal("CPF JA EXISTENTE NO SISTEMA")
                inputCpf.value = ""
                return
            }
        } catch (error) {
            console.error('Erro ao verificar existência:', error);
        }
    } else {
        console.log("Teste");
    }
});

//===================================================================
//atualizando cep
const cep = document.getElementById('inputCep')
cep.addEventListener('keyup', () => {
    if (cep.value.length === 9 && !cep.value.includes('_'))
        apiCep(cep.value)
})


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
                document.getElementById('inputLogradouro'+comp).value = "";
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

//modal settings

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

function mascaras() {
    $('#inputCPF').inputmask('999.999.999-99', { reverse: true });
    $('#inputCep').inputmask('99999-999');
    $('#inputTelefone').inputmask('(99) 9 9999-999');
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
})();