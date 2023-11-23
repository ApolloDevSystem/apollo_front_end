function render(div, component, scriptsrc, token){
    //fetch de render
    fetch(component)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o componente: ${response.status}`);
            }
            return response.text()
        })  
        .then(html => {
            div.innerHTML = html
            if(scriptsrc !== null){
                const script = document.createElement('script');
                script.type = 'module'
                script.src = scriptsrc;
                script.onload = function() {
                    console.log('Script carregado!');
                };
                div.appendChild(script)
            }
        })
        .catch(error => console.error(error));
}   