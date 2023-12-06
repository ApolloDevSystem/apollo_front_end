async function get(rota, dado) {
    try {
        if(typeof dado === "string"){
            dado = parseInt(dado, 10)
        }

        const response = await fetch(`http://127.0.0.1:8000/api/${rota}/`+dado, {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': token
            },
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error.message);
        throw error;
    }
}


async function post(rota, dado) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/criar-' + rota, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            mode: 'cors',
            body: JSON.stringify(dado)
        });
        console.log('Resposta do servidor:', response);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;  // Isso permite que o erro seja propagado para o código que chamou a função post
    }
}