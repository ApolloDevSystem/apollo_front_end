(function () {
    mascaras()
    let formCriado = false;
    const divEnderecoAdicional = document.getElementById('novoEnd');

    const btnAddEnd = document.getElementById('btnAddEndereco')
    btnAddEnd.addEventListener('click', function () {
        event.preventDefault()
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

        // Obtém o valor do input radio selecionado
        let tipoEndereco;
        const radioCasa = document.getElementById('radioCasa' + num);
        const radioPredio = document.getElementById('radioPredio' + num);
        const radioEmpresa = document.getElementById('radioEmpresa' + num);

        if (radioCasa.checked) {
            tipoEndereco = radioCasa.value;
        } else if (radioPredio.checked) {
            tipoEndereco = radioPredio.value;
        } else if (radioEmpresa.checked) {
            tipoEndereco = radioEmpresa.value;
        } else {
            window.alert("selecione um complemento")
            return null
        }

        // Monta um objeto com os dados
        const endereco = {
            CEP: cepGet,
            UF: uf,
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
        event.preventDefault()
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
    //===================================================================
    //checa existencia do cpf
    const inputCpf = document.getElementById('inputCPF');
    inputCpf.addEventListener('keyup', async () => {
        if (inputCpf.value.length === 14 && !inputCpf.value.includes('_')) {
        
            try {
                const existe = await get('funcionarioCpf', inputCpf.value);
                console.log(existe.funcionarios.length)
                if (existe.funcionarios.length !== 0) {
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
})(); 