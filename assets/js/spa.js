// Função principal de renderização SPA (Single Page Application)
function render(div, component, scriptsrc, callback = null) {
    // Fetch de render
    fetch(component)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o componente: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Remova todos os filhos existentes
            div.innerHTML = "";

            // Adicione o novo HTML
            div.innerHTML = html;

            // Adicione ou atualize o script
            if (scriptsrc !== null) {
                const script = document.createElement('script');
                script.src = scriptsrc;
                script.onload = function () {
                    console.log('Script carregado! ' + scriptsrc);
                    if (callback) {
                        callback();
                    }
                };
                div.appendChild(script);
            } else {
                if (callback) {
                    callback();
                }
            }
        })
        .catch(error => console.error(error));
}


function renderModal(div, component, scriptsrc, callback = null) {
    // Fetch de render
    fetch(component)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o componente: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            div.innerHTML += html;
            if (scriptsrc !== null) {
                const script = document.createElement('script');
                script.src = scriptsrc;
                script.onload = function () {
                    console.log('Script carregado! ' + scriptsrc);
                    if (callback) {
                        callback();
                    }
                };
                div.appendChild(script);
            } else {
                if (callback) {
                    callback();
                }
            }
        })
        .catch(error => console.error(error));
}
