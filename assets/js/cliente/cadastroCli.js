(function () {
    mascaras();

    let formCriado = false;
    const divEnderecoAdicional = document.getElementById('novoEnd');

    const btnAddEnd = document.getElementById('btnAddEndereco');
    btnAddEnd.addEventListener('click', function () {
        event.preventDefault();
        if (!formCriado) {
            const endereco = "componentes/endereco.html";
            render(divEnderecoAdicional, endereco, "assets/js/endereco/endereco.js");
            document.getElementById('btnAddEndereco').textContent = "Remover Endereço Adicional";
            formCriado = true;
        } else {
            divEnderecoAdicional.innerHTML = "";
            document.getElementById('btnAddEndereco').textContent = "Adicionar outro endereço";
            formCriado = false;
        }
    });

    function obterDadosFormularioCliente() {
        const inputNome = document.getElementById('inputNome').value;
        const inputCPF = document.getElementById('inputCPF').value;
        const inputTelefone = document.getElementById('inputTelefone').value;
        const inputEmail = document.getElementById('inputEmail').value;

        const cliente = {
            nome: inputNome,
            cpf: inputCPF,
            numero: inputTelefone,
            email: inputEmail,
            enderecos: null
        };

        console.log('Dados do formulário:', cliente);

        return cliente;
    }

    function obterDadosFormularioEndereco(num = "") {
        const cepGet = document.getElementById('inputCep' + num).value;
        const uf = document.getElementById('inputUF' + num).value;
        const cidade = document.getElementById('inputCidade' + num).value;
        const bairro = document.getElementById('inputBairro' + num).value;
        const logradouro = document.getElementById('inputLogradouro' + num).value;
        const numero = document.getElementById('inputNumero' + num).value;
        const referencia = document.getElementById('inputReferencias' + num).value;

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

        console.log('Dados do formulário:', endereco);

        return endereco;
    }

    document.getElementById('btnCadastrar').addEventListener('click', async function () {
        event.preventDefault();
        const formulario = document.querySelector('form');
        if (formulario.checkValidity()) {

            const cliente = obterDadosFormularioCliente();

            if (cliente) {
                const enderecoPrincipal = obterDadosFormularioEndereco();
                let enderecoAdicional = null;
                if (formCriado)
                    enderecoAdicional = obterDadosFormularioEndereco('1');

                if (enderecoPrincipal || enderecoAdicional) {
                    cliente.enderecos = [enderecoPrincipal, enderecoAdicional].filter(Boolean);
                    const dadosParaAPI = {
                        cliente: cliente,
                    };

                    console.log('Dados a serem enviados para a API:', dadosParaAPI);

                    await post('cliente', dadosParaAPI);
                } else {
                    window.alert("Preencha pelo menos um endereço");
                }
            }
        } else {
            console.log('Formulário inválido');
        }
    });


    //checa existencia do cpf
    const inputCpf = document.getElementById('inputCPF');
    inputCpf.addEventListener('keyup', async () => {
        if (inputCpf.value.length === 14 && !inputCpf.value.includes('_')) {
            try {
                const existe = await get('clienteCpf', inputCpf.value);
                console.log(existe)
                console.log(existe.clientes.length)
                if (existe.clientes.length !== 0) {
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