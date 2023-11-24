//função principal de renderização spa (Single Page Application)
function render(div, component, scriptsrc) {
    //fetch de render
    fetch(component)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o componente: ${response.status}`);
            }
            return response.text()
        })
        .then(html => {
            if (!(div.innerHTML.trim() !== ""))
                div.innerHTML = "";
            div.innerHTML = html
            if (scriptsrc !== null) {
                const script = document.createElement('script');
                //script.type = 'module'
                script.src = scriptsrc;
                script.onload = function () {
                    console.log('Script carregado! ' + scriptsrc);
                };
                div.appendChild(script)
            }
        })
        .catch(error => console.error(error));
}   