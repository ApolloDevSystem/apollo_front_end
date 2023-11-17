function carregarClientes(){
    const tbody = document.querySelector("#tbody-clientes")

    const tr = document.createElement('tr')
    const tb = document.createElement('tb')
//fazer fetch de get clientes e aninhar no tbody
}

document.getElementById('btnAddEndereco').addEventListener('click', function() {
    var container = document.createElement('div');
    container.innerHTML = `
      <h3>Endereço Adicional</h3>
      <div class="row">
        <div class="col">
            <div class="form-floating mb-3">
                <input class="form-control" id="inputBairro" style="background-color: #D9D9D9;">
                <label for="inputBairro">Bairro</label>
            </div>
        </div>
        <div class="col">
            <div class="form-floating mb-3">
                <input class="form-control" id="inputRua" style="background-color: #D9D9D9;">
                <label for="inputRua">Rua / Avenida</label>      
            </div>
        </div>
        <div class="col">
            <div class="form-floating mb-3">
                <input class="form-control" id="inputNumero" style="background-color: #D9D9D9;">
                <label for="inputNumero">Número</label>      
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-floating mb-3">
              <textarea class="form-control" id="inputReferencias" style="height: 100px; background-color: #D9D9D9;"></textarea>
              <label for="inputReferencias">Referências / Descrição do prédio</label>      
          </div>
        </div>
        <div class="col">
            <div class="form-floating mb-3">
                <input class="form-control" id="inputComplemento" style="background-color: #D9D9D9;">
                <label for="inputComplemento">Complemento</label>      
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkCasa">
                <label class="form-check-label" for="checkCasa">
                    Casa
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkTrabalho">
                <label class="form-check-label" for="checkTrabalho">
                    Trabalho
                </label>
            </div>
        </div>
      </div>
    `;
    document.body.appendChild(container);
  });