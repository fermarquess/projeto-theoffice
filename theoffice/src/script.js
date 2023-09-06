const characterId = document.getElementById('characterId');
const btn = document.getElementById('btn');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');


const fetchApi = (value) => {
    const result = fetch(`https://theofficeapi.dev/api/character/${value}`)
    .then((res) => res.json())
    .then((data) => {
        
        return data;

    });

    return result

}

const keys = ['name', 'job', 'actor'];
const newKeys = {
    name: 'Nome',
    job: 'Cargo',
    actor: 'Ator/Atriz',
}


const buildResult = (result) => {
    return keys.map((key) => document.getElementById(key))
        .map((element) => {
            if(element.checked && (Array.isArray(result[element.name])) ===  true){
                const arrayResult = result[element.name].join('\r\n');
                const newElement = document.createElement('p');
                newElement.innerHTML = `${newKeys[element.name]}: ${arrayResult}`;
                content.appendChild(newElement);

            } else if(element.checked === true && (result[element.name]) !== 'object'){
                const newElement = document.createElement('p');
                newElement.innerHTML = `${newKeys[element.name]}: ${result[element.name]}`;
                content.appendChild(newElement);
            } else if(element.checked === true && typeof (result[element.name]) !== 'object'){
                const newElement = document.createElement('p');
                newElement.innerHTML = `${newKeys[element.name]}: ${result[element.name]}`;
                content.appendChild(newElement);
            }
        });
}


btn.addEventListener('click', async (event) => {
    event.preventDefault();

    if(characterId.value === ''){
        return content.innerHTML = 'É necessário fazer um filtro';
    }

    const result = await fetchApi(characterId.value);

    if(content.firstChild === null){
        conteinerResult.className = 'result-style';
        buildResult(result);
    } else{
        content.innerHTML = '';
        conteinerResult.className = 'result-style';
        buildResult(result);
    } 
    
    

});

btnReset.addEventListener('click', () => location.reload());