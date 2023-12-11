(function () {
    let formularioCriado = false;
    const divEnderecoAdicional = document.getElementById('novoServico');
    let con = 0;
    let con1 = 0;

    clientesBusca()
    const select = document.getElementById('inputNomeCliente')
    async function clientesBusca() {
        const clientes = await getAll('clientes')
        console.log(clientes)

        clientes.forEach(cliente => {
            const option = document.createElement('option')
            option.value = cliente.nome
            option.textContent = cliente.nome
            select.appendChild(option)
        })

    }

    const checkbox = document.getElementById('checkBtnCli');
    const button = document.getElementById('btnCadCli');

    button.addEventListener('click', cadastrarCli)

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // Se o checkbox estiver marcado, remova o atributo 'disabled' do botão
            button.removeAttribute('disabled');
            select.setAttribute('disabled', true);
        } else {
            // Se o checkbox não estiver marcado, adicione o atributo 'disabled' ao botão
            button.setAttribute('disabled', true);
            select.removeAttribute('disabled');
        }
    });
    document.getElementById('btnAddServico').addEventListener('click', function () {

        if (con < 5) {
            createFormServ();
            $('#inputValor' + con).inputmask({
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
            scrollToBottom();
            con++;
        }

    });

    document.getElementById('btnAddFuncionario').addEventListener('click', function () {

        if (con1 < 3) {
            createFormFunc();
            scrollToBottom();
            con1++;
        }

    });

    // Função para criar um elemento HTML com os atributos fornecidos
    function createElement(type, attributes) {
        const element = document.createElement(type);
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        return element;
    }

    // Função para adicionar um elemento ao documento
    function appendElement(parent, ...children) {
        children.forEach(child => {
            parent.appendChild(child);
        });
    }

    function createFormServ() {
        const mainContainer = document.getElementById("novoServico");

        // Criar div com classe "container"
        const divContainer = createElement('div', { class: 'container my-2' });
        appendElement(mainContainer, divContainer);

        // Criar div com classe "row"
        const divRow = createElement('div', { class: 'row' });
        appendElement(divContainer, divRow);

        const colTipo = createElement('div', { class: 'col-md-3 mx-2 px-0' });

        const formFloatingTipo = createElement('div', { class: 'form-floating' });
        const select = createElement('select', {
            class: 'form-select',
            id: 'tipoServico' + con,
            'aria-label': 'Floating label select example',
            style: 'width: 100%; background-color: #d9d9d9',
        });
        const option1 = createElement('option', { value: '' });
        option1.textContent = 'Selecione um serviço';

        const option2 = createElement('option', { value: '1' });
        option2.textContent = 'Manutenção';

        const option3 = createElement('option', { value: '2' });
        option3.textContent = 'Instalação';

        const option4 = createElement('option', { value: '2' });
        option4.textContent = 'Limpeza';

        appendElement(select, option1);
        appendElement(select, option2);
        appendElement(select, option3);
        appendElement(select, option4);
        appendElement(formFloatingTipo, select);

        const labelTipo = createElement('label', { for: 'tipoServico' });
        labelTipo.textContent = 'Tipo de serviço';
        appendElement(formFloatingTipo, labelTipo);
        appendElement(colTipo, formFloatingTipo);

        const colValor = createElement('div', { class: 'col-md-2 mx-2 px-0' });
        const formFloatingValor = createElement('div', { class: 'form-floating' });

        const input = createElement('input', {
            class: 'form-control',
            id: 'inputValor' + con,
            style: 'width: 100%; background-color: #d9d9d9',
        });

        const labelValor = createElement('label', { for: 'inputValor' });
        labelValor.textContent = 'Valor';
        appendElement(formFloatingValor, input);
        appendElement(formFloatingValor, labelValor);
        appendElement(colValor, formFloatingValor);

        const colRemover = createElement('div', { class: 'col-md-2 remover' });
        const formFloatingRemover = createElement('div', { class: 'form-floating' });
        const remover = createElement('img', {
            src: 'icons/remove.png',
        });

        remover.addEventListener('click', () => {
            mainContainer.removeChild(divContainer)
            con--
        })
        appendElement(formFloatingRemover, remover);
        appendElement(colRemover, formFloatingRemover);

        appendElement(divRow, colTipo);
        appendElement(divRow, colValor);
        appendElement(divRow, colRemover);
    }

    function scrollToBottom() {
        const element = document.documentElement || document.body;
        element.scrollTop = element.scrollHeight;
    }


    async function createFormFunc() {
        const mainContainer = document.getElementById("novoFuncionario");
    
        // Criar div com classe "container"
        const divContainer = createElement('div', { class: 'container my-2' });
        appendElement(mainContainer, divContainer);
    
        // Criar div com classe "row"
        const divRow = createElement('div', { class: 'row' });
        appendElement(divContainer, divRow);
    
        // Criar coluna para o select
        const colFunc = createElement('div', { class: 'col-md-4 mx-2 px-0' });
        const selectFuncionarios = await createSelectFuncionarios(); // Adicionado await aqui
        appendElement(colFunc, selectFuncionarios);
    
        // Criar coluna para o botão de remover
        const colRemover = createElement('div', { class: 'col-md-2' });
        const formFloatingRemover = createElement('div', { class: 'form-floating' });
        const remover = createElement('img', {
            src: 'icons/remove.png',
            style: 'cursor: pointer;', // Adicionando estilo para o cursor ficar com aparência de clique
        });
    
        remover.addEventListener('click', () => {
            mainContainer.removeChild(divContainer);
            con1--; // Se necessário decrementar con (não está claro o contexto do con)
        });
    
        appendElement(formFloatingRemover, remover);
        appendElement(colRemover, formFloatingRemover);
    
        appendElement(divRow, colFunc, colRemover);
    }
    
    async function createSelectFuncionarios() {
        // Criar o elemento select
        const select = createElement('select', { class: 'form-select' });
    
        // Adicionar uma opção padrão
        const defaultOption = createElement('option', { value: '' });
        defaultOption.text = 'Selecione um funcionário';
        appendElement(select, defaultOption);
    
        try {
            const response = await getAll('funcionarios');
    
            // Adicionar opções com base nos funcionários da API
            response.forEach((funcionario) => {
                const option = createElement('option', { value: funcionario.id });
                option.text = funcionario.nome;
                appendElement(select, option);
            });
        } catch (error) {
            console.error('Erro ao obter dados da API:', error);
            // Adicionar uma opção de erro ao select, se necessário
            const errorOption = createElement('option', { value: '' });
            errorOption.text = 'Erro ao obter dados da API';
            appendElement(select, errorOption);
        }
    
        return select;
    }
    
})();
