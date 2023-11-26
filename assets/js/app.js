function carregarConteudo(rota) {

    switch (rota) {
        case '/clientes':
            console.log("aqui")
            break;
        // Adicione mais casos conforme necessário
        default:
            window.location.href = "index.html";
    }
}

window.addEventListener('popstate', () => {
    const novaRota = window.location.pathname;
    carregarConteudo(novaRota);
});

