function carregarConteudo(rota) {

    switch (rota) {
        case '/clientes':
            console.log("Aqui")
            break;
        case '/servicos':
            console.log("Aqui")
        // Adicione mais casos conforme necessário
        default:
            window.location.href = "index.html";
    }
}

window.addEventListener('popstate', () => {
    const novaRota = window.location.pathname;
    carregarConteudo(novaRota);
});

