(function () {
    let formularioCriado = false;
    const divEnderecoAdicional = document.getElementById('novoServico');
    let con = 0;

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

        if (con < 4) {
            createForm();
            scrollToBottom();
            con++;
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
    function appendElement(parent, child) {
        parent.appendChild(child);
    }

    function createForm() {
        const mainContainer = document.getElementById("novoServico");

        // Criar div com classe "container"
        const divContainer = createElement('div', { class: 'container' });
        appendElement(mainContainer, divContainer);

        // Criar div com classe "row"
        const divRow = createElement('div', { class: 'row' });
        appendElement(divContainer, divRow);

        const colTipo = createElement('div', { class: 'col-md-3 mx-2 px-0' });

        const formFloatingTipo = createElement('div', { class: 'form-floating' });
        const select = createElement('select', {
            class: 'form-select',
            id: 'tipoServico',
            'aria-label': 'Floating label select example',
            style: 'width: 100%; background-color: #d9d9d9',
        });
        const option1 = createElement('option', { value: '' });
        option1.textContent = '';

        const option2 = createElement('option', { value: '1' });
        option2.textContent = 'Manutenção';

        const option3 = createElement('option', { value: '2' });
        option3.textContent = 'Instalação';

        appendElement(select, option1);
        appendElement(select, option2);
        appendElement(select, option3);
        appendElement(formFloatingTipo, select);

        const labelTipo = createElement('label', { for: 'tipoServico' });
        labelTipo.textContent = 'Tipo de serviço';
        appendElement(formFloatingTipo, labelTipo);
        appendElement(colTipo, formFloatingTipo);

        const colValor = createElement('div', { class: 'col-md-2 mx-2 px-0' });
        const formFloatingValor = createElement('div', { class: 'form-floating' });

        const input = createElement('input', {
            class: 'form-control',
            id: 'inputValor',
            style: 'width: 100%; background-color: #d9d9d9',
            disabled: 'true',
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
        appendElement(formFloatingRemover, remover);
        appendElement(colRemover, formFloatingRemover);

        appendElement(divRow, colTipo);
        appendElement(divRow, colValor);
        appendElement(divRow, colRemover);

        
        const br = createElement('br', {});
        appendElement(mainContainer, br);
    }

    function scrollToBottom() {
        const element = document.documentElement || document.body;
        element.scrollTop = element.scrollHeight;
    }
})();



