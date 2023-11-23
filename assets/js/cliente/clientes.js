



let formularioCriado = false;
const divEnderecoAdicional = document.getElementById('novoEnd');

document.getElementById('btnAddEndereco').addEventListener('click', function () {
  if (!formularioCriado) {
    createForm();
    document.getElementById('btnAddEndereco').style.display = 'none';
    formularioCriado = true;
  } else {
    divEnderecoAdicional.style.display = 'block';
    document.getElementById('btnAddEndereco').style.display = 'none';
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

// Função principal para criar os elementos
function createForm() {
  const mainContainer = document.getElementById("novoEnd");

  // Criar hr
  const hr = createElement('hr', {});
  appendElement(mainContainer, hr);

  // Criar h3
  const h3 = createElement('h3', {});
  h3.textContent = 'Endereço Adicional';
  appendElement(mainContainer, h3);

  // Criar div com classe "row"
  const divRow = createElement('div', { class: 'row' });
  appendElement(mainContainer, divRow);

  // Criar colunas
  for (let i = 0; i < 3; i++) {
    const divCol = createElement('div', { class: 'col' });
    appendElement(divRow, divCol);

    // Criar form-floating mb-3
    const formFloating = createElement('div', { class: 'form-floating mb-3' });
    appendElement(divCol, formFloating);

    // Criar input
    const input = createElement('input', {
      class: 'form-control',
      id: `input${i === 0 ? 'Bairro' : i === 1 ? 'Rua' : 'Numero'}`,
      style: 'background-color: #D9D9D9;',
    });
    appendElement(formFloating, input);

    // Criar label
    const label = createElement('label', {
      for: `input${i === 0 ? 'Bairro' : i === 1 ? 'Rua' : 'Numero'}`,
    });
    label.textContent = i === 0 ? 'Bairro' : i === 1 ? 'Rua / Avenida' : 'Número';
    appendElement(formFloating, label);
  }

  // Criar segunda linha
  const divRow2 = createElement('div', { class: 'row' });
  appendElement(mainContainer, divRow2);

  // Criar colunas da segunda linha
  for (let i = 0; i < 2; i++) {
    const divCol = createElement('div', { class: 'col' });
    appendElement(divRow2, divCol);

    // Criar form-floating mb-3
    const formFloating = createElement('div', { class: 'form-floating mb-3' });
    appendElement(divCol, formFloating);

    // Criar textarea para a segunda coluna
    if (i === 0) {
      const textarea = createElement('textarea', {
        class: 'form-control',
        id: 'inputReferencias',
        style: 'height: 100px; background-color: #D9D9D9;',
      });

      const label = createElement('label', {
        for: 'inputReferencias',
      });
      label.textContent = 'Referências / Descrição do prédio';
      appendElement(formFloating, textarea);
      appendElement(formFloating, label);
    }
    // Criar input para a terceira coluna
    else {
      const input = createElement('input', {
        class: 'form-control',
        id: 'inputComplemento',
        style: 'background-color: #D9D9D9;',
      });
      appendElement(formFloating, input);

      // Criar label para a terceira coluna
      const label = createElement('label', { for: 'inputComplemento' });
      label.textContent = 'Complemento';
      appendElement(formFloating, label);
    }
  }

  // Criar terceira linha
  const divRow3 = createElement('div', { class: 'row' });
  appendElement(mainContainer, divRow3);

  // Criar coluna da terceira linha
  const divCol3 = createElement('div', { class: 'col' });
  appendElement(divRow3, divCol3);

  // Criar form-check para checkboxes
  const formCheck1 = createElement('div', { class: 'form-check' });
  appendElement(divCol3, formCheck1);

  // Criar checkbox "Casa"
  const checkboxCasa = createElement('input', {
    class: 'form-check-input',
    type: 'checkbox',
    value: '',
    id: 'checkCasaAdc',
  });
  appendElement(formCheck1, checkboxCasa);

  // Criar label para "Casa"
  const labelCasa = createElement('label', { class: 'form-check-label', for: 'checkCasaAdc' });
  labelCasa.textContent = 'Casa';
  appendElement(formCheck1, labelCasa);

  // Criar form-check para checkboxes
  const formCheck2 = createElement('div', { class: 'form-check' });
  appendElement(divCol3, formCheck2);

  // Criar checkbox "Trabalho"
  const checkboxTrabalho = createElement('input', {
    class: 'form-check-input',
    type: 'checkbox',
    value: '',
    id: 'checkTrabalhoAdc',
  });
  appendElement(formCheck2, checkboxTrabalho);

  // Criar label para "Trabalho"
  const labelTrabalho = createElement('label', { class: 'form-check-label', for: 'checkTrabalhoAdc' });
  labelTrabalho.textContent = 'Trabalho';
  appendElement(formCheck2, labelTrabalho);

  const btnRemoverEndereco = createElement('button', {
    id: 'btnRemoverEndereco',
  });
  btnRemoverEndereco.textContent = 'Remover Endereço Adicional';
  btnRemoverEndereco.classList.add('btn', 'btn-outline-success', 'mt-4')
  btnRemoverEndereco.onclick = function () {
    removeForm();
  };
  appendElement(mainContainer, btnRemoverEndereco);


}

function removeForm() {

  const inputs = divEnderecoAdicional.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.value = '';
  });

  const checkboxCasa = document.getElementById('checkCasaAdc');
  const checkboxTrabalho = document.getElementById('checkTrabalhoAdc');
  checkboxCasa.checked = false;
  checkboxTrabalho.checked = false;

  // Esconde a div do endereço adicional
  divEnderecoAdicional.style.display = 'none';


  // Exibe o botão de adicionar novamente
  document.getElementById('btnAddEndereco').style.display = 'block';
}
