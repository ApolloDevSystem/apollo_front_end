function get(token, rota){
    return fetch('http://127.0.0.1:8000/api/'+rota,{
        method: 'GET',
        headers: {
            'X-CSRF-TOKEN': token
        },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        return data
    })
    .catch(error => { 
        console.error(error);
    });
}

export { get }

function post(rota, dado){
    return fetch('http://127.0.0.1:8000/api/criar-' + rota, {
        method: 'POST',  // Corrigido para 'POST'
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
        },
        mode: 'cors',
        body: JSON.stringify(dado)  // Incluído o corpo da requisição com os dados
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => { 
        console.error(error);
    });
}

export { post }