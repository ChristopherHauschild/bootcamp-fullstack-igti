const fs = require('fs');

// Cria os arquivos por estado
const createAllStateFiles = () => {
    fs.readFile('./db/Estados.json', (err, data) => {
        if (err) {
            console.log('Erro ao ler arquivo Estados.json', err);
            return;
        }

        const estados = JSON.parse(data.toString());
        
        fs.readFile('./db/Cidades.json', (err, cidData) => {
            if (err) {
                console.log('Erro ao ler arquivo Cidades.json', err);
                return;
            }

            const listaCidades = JSON.parse(cidData.toString());
            
            estados.forEach(estado => {
                saveStateFile(estado, listaCidades);
            });
        });
    });
}

const saveStateFile = (estado, listaCidades) => {
    const cidadesPertencentes = listaCidades.filter(cidade => cidade.Estado === estado.ID);

    fs.writeFile(
        `./Estados/${estado.Sigla}.json`, 
        JSON.stringify(cidadesPertencentes, null, 4), 
        (err) => {
            if (err) {
                console.log(`Erro ao gravar arquivo ${estado.Sigla}.json`, err);
                return;
            }
            
            console.log(`Arquivo ${estado.Sigla}.json salvo!`);
        }
    );
}

const countNumberOfCities = (state) => {
    const stateData = fs.readFileSync(`./Estados/${state}.json`);
    
    const cities = JSON.parse(stateData.toString());

    return cities.length;
}

const findStatesWithMoreCities = () => {
    const stateData = fs.readFileSync(`./db/Estados.json`);    
    const states = JSON.parse(stateData.toString());
    const countedStates = states.map(state => ({uf: state.Sigla, count: countNumberOfCities(state.Sigla)}));
    const sortedStates = countedStates.sort((a, b) => {
        if (a.count > b.count) return -1;
        if (a.count < b.count) return 1
        return 0;
    });
    /**** PROFESSOR FDP BEGIN *****/
    const sortedStatesCopy = [ ...sortedStates ];
    const statesWithMore = sortedStatesCopy.splice(0, 5);
    const sum = statesWithMore.reduce((acc, state) => acc + state.count, 0);
    /**** PROFESSOR FDP END *****/
    const printStates = sortedStates.splice(0, 5).map(state => `${state.uf} - ${state.count}`);
    console.log(printStates);
    console.log(`Quantidade Total de cidades dos estados com mais cidades = ${sum}`);
}

const findStatesWithLessCities = () => {
    const stateData = fs.readFileSync(`./db/Estados.json`);    
    const states = JSON.parse(stateData.toString());
    const countedStates = states.map(state => ({uf: state.Sigla, count: countNumberOfCities(state.Sigla)}));
    const sortedStates = countedStates.sort((a, b) => {
        if (a.count > b.count) return 1;
        if (a.count < b.count) return -1
        return 0;
    });
    /**** PROFESSOR FDP BEGIN *****/
    const sortedStatesCopy = [ ...sortedStates ];
    const statesWithLess = sortedStatesCopy.splice(0, 5);
    const sum = statesWithLess.reduce((acc, state) => acc + state.count, 0);
    /**** PROFESSOR FDP END *****/
    const printStates = sortedStates.splice(0, 5).map(state => `${state.uf} - ${state.count}`);
    console.log(printStates);
    console.log(`Quantidade total de cidades dos estados com menos cidades = ${sum}`);
}

const findCityWithLargestNameByState = (state) => {
    const cityData = fs.readFileSync(`./db/Cidades.json`);    
    const cities = JSON.parse(cityData.toString());

    const stateCities = cities.filter(city => city.Estado === state.ID).map(city => city.Nome);
    const sortedCities = stateCities.sort((a, b) => {
        if (a.length > b.length) return 1;
        if (a.length < b.length) return -1;
        return 0;
    }).reverse();

    return sortedCities[0];
}

const findCityWithSmallestNameByState = (state) => {
    const cityData = fs.readFileSync(`./db/Cidades.json`);    
    const cities = JSON.parse(cityData.toString());

    const stateCities = cities.filter(city => city.Estado === state.ID).map(city => city.Nome);
    const sortedCities = stateCities.sort((a, b) => {
        if (a.length > b.length) return 1;
        if (a.length < b.length) return -1;
        return 0;
    });

    return sortedCities[0];
}

const findAllCitiesWithLargestName = () => {
    const stateData = fs.readFileSync(`./db/Estados.json`);    
    const states = JSON.parse(stateData.toString());

    const largestNamesCities = states.map(state => `${findCityWithLargestNameByState(state)} - ${state.Sigla}`);
    
    console.log(largestNamesCities);
}

const findAllCitiesWithSmallestName = () => {
    const stateData = fs.readFileSync(`./db/Estados.json`);    
    const states = JSON.parse(stateData.toString());

    const largestNamesCities = states.map(state => `${findCityWithSmallestNameByState(state)} - ${state.Sigla}`);
    
    console.log(largestNamesCities);
}

const findLargestNameCity = () => {
    const stateData = fs.readFileSync(`./db/Estados.json`);    
    const states = JSON.parse(stateData.toString());

    const largestNamesCities = states.map(state => `${findCityWithLargestNameByState(state)} - ${state.Sigla}`);
    
    const largestNameCity = largestNamesCities.sort().sort((a, b) => {
        if (a.length > b.length) return -1;
        if (a.length < b.length) return 1;
        return 0;
    })[0];

    console.log(largestNameCity);
}

const findSmallestNameCity = () => {
    const stateData = fs.readFileSync(`./db/Estados.json`);    
    const states = JSON.parse(stateData.toString());

    const smallestNamesCities = states.map(state => `${findCityWithSmallestNameByState(state)} - ${state.Sigla}`);
    
    const smallestNameCity = smallestNamesCities.sort().sort((a, b) => {
        if (a.length > b.length) return 1;
        if (a.length < b.length) return -1;
        return 0;
    })[0];

    console.log(smallestNameCity);
}

/******************* EXECUCAO *********************/
// createAllStateFiles();
// console.log(countNumberOfCities('PB'))

console.log('\n**************************** Estados com mais cidades ******************************');
findStatesWithMoreCities();

console.log('\n**************************** Estados com menos cidades ******************************');
findStatesWithLessCities();

console.log('\n**************************** Cidades com maior nome divididas por estado ******************************');
findAllCitiesWithLargestName();

console.log('\n**************************** Cidade com maior nome de todos os estados ******************************');
findLargestNameCity();

console.log('\n**************************** Cidades com menor nome divididas por estado ******************************');
findAllCitiesWithSmallestName();

console.log('\n**************************** Cidade com menor nome de todos os estados ******************************');
findSmallestNameCity();