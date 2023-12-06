(function () {
    mascaras()
    const cep1 = document.getElementById('inputCep1')
    cep1.addEventListener('keyup', () => {
        if (cep1.value.length === 9 && !cep1.value.includes('_'))
            apiCep(cep1.value, '1')
    })
})()
