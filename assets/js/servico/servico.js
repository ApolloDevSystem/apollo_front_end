(function() {
let formularioCriado = false;
const divEnderecoAdicional = document.getElementById('novoServico');
let con = 0;

document.getElementById('btnAddServico').addEventListener('click', function() {

    if (con<4) {
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

    // Criar colunas
    for (let i = 0; i < 2; i++) {
        const divCol = createElement('div', { class: 'col-md-2 mx-0 px-0' });
        appendElement(divRow, divCol);

        // Criar form-floating mb-3
        const formFloating = createElement('div', { class: 'form-floating' });
        appendElement(divCol, formFloating);

        // Criar select para a primeira coluna
        if (i === 0) {
            const select = createElement('select', {
                class: 'form-select',
                id: 'tipoServico',
                'aria-label': 'Floating label select example',
                style: 'width: 100%; background-color: #d9d9d9',
            });

            const option1 = createElement('option', { value: '' });
            // Não adiciona o atributo selected ao primeiro elemento de opção
            option1.textContent = '';

            const option2 = createElement('option', { value: '1' });
            option2.textContent = 'Manutenção';

            const option3 = createElement('option', { value: '2' });
            option3.textContent = 'Instalação';

            appendElement(select, option1);
            appendElement(select, option2);
            appendElement(select, option3);
            appendElement(formFloating, select);

            const label = createElement('label', { for: 'tipoServico' });
            label.textContent = 'Tipo de serviço';
            appendElement(formFloating, label);
        }
        // Criar input para a segunda coluna
        else {
            const input = createElement('input', {
                class: 'form-control',
                id: 'inputValor',
                style: 'width: 100%; background-color: #d9d9d9',
                disabled: 'true',
            });

            appendElement(formFloating, input);

            const label = createElement('label', { for: 'inputValor' });
            label.textContent = 'Valor';
            appendElement(formFloating, label);
        }

        // Adicionar a tag <br> entre as colunas
        if (i === 0) {
            const br = createElement('br', {});
            appendElement(divRow, br);
        }
    }
    const br = createElement('br', {});
    appendElement(mainContainer, br);
}

function scrollToBottom() {
    const element = document.documentElement || document.body;
    element.scrollTop = element.scrollHeight;
}
})();



