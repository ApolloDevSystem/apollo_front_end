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