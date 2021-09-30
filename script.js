//let pokemonElements = [{ 'normal': 'normal', 'fighting': 'fighting', 'flying': 'flying', 'poison': 'poison', 'ground': 'ground', 'rock': 'rock', 'bug': 'bug', 'ghost': 'ghost', 'steel': 'steel', 'fire': 'fire', 'water': 'water', 'grass': 'grass', 'electric': 'electric', 'psychic': 'psychic', 'ice': 'ice', 'dragon': 'dragon', 'dark': 'dark', 'fairy': 'fairy' }];
let barValue = ['hp', 'attack', 'defense', 'speed', 'special-attack'];
let currentPokemon = [];
let allPokemons = [];
let data = [[1, 2, 3, 10]];
let label = [["fire", "water", "push", "atom"]];
let xdata = [];
let ydata = [];
let xdataValue = [];
let ydataValue = [];
let xValue;
let yValue;
let valuex;
let valuey;
let limit = 21;
let offset = 1;
let pokemonType1;


//set variable scrolling by command onscroll 
let scrolling = false;
window.onscroll = () => {
    scrolling = true;
};
//set the limit of loading pokemons by limit and offset
setInterval(() => {
    if (scrolling) {
        scrolling = false;
        if (limit < 201) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                limit += 20;
                offset += 20;
                loadPokemon();
                console.log('onscroll limit:', limit);
                console.log('onscroll offset:', offset);
            }
        }
    }
}, 500);
//loading JSON-Array from pokeapi
async function loadPokemon() {
    for (let i = offset; i < limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/?offset=${offset}&limit=${limit}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
    }
    renderPokemonInfo()
};
//search function for searching pokemon names
function filterPosts() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let renderSearch = document.getElementById('pokemonCards');
    renderSearch.innerHTML = '';
    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i]['name'].includes(search)) {
            renderSearch.innerHTML += renderSearched(i);
        }
    }
};
//render content for the searched card
function renderSearched(i) {
    return `  <div id="pokemonCard${i}" class="card card-style ${allPokemons[i]['types'][0]['type']['name']}" style="width: 18rem;" onclick="toggleCard(${i})">
    <div class="pokemonID" id="pokemonID${i}"> #${allPokemons[i]['id']} <h5 class="card-title">${allPokemons[i]['name']}</h5> <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showPokemonModal(${i})" >
    view
  </button></div>
    <img id="pokemonIcon${i}" src="${allPokemons[i]['sprites']['other']['dream_world']['front_default']}" class="card-img-top img-style">
    <div id="card-body${i}" class="card-body card-body-style d-none">
        <div class="types">
            <div class="card style-types-box bg-success">
                <div id="type-${i}" class="card-body style-types">
                    u.a.
                </div>
            </div>
            <div class="card style-types-box bg-secondary ">
                <div id="type-x${i}" class="card-body style-types">  
                </div>
            </div>
        </div>
        <div class="information">
            <div class="card-body information-box">
                <span id="weight${i}"></span>
                Weight
            </div>
            <div class="card-body information-box">
                <span id="height${i}"></span>
                Height
            </div>
        </div>
    `;
};
//loading the pokemonInfos into the cards
async function renderPokemonInfo() {
    let offsetValue = offset - 1;
    for (let i = offsetValue; i < allPokemons.length; i++) {
        renderPokemonCards(i);
        pokemonInfo(i);
        loadStats(i);
        renderPokemonTypes(i);
    }
};

function pokemonInfo(i) {
    document.getElementById('pokemonIcon' + i).src = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonID' + i).innerHTML = '#' + allPokemons[i]['id'] + `
    <h5 class="card-title">${allPokemons[i]['name']}</h5>
    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showPokemonModal(${i})" >view</button>
    `;
}
//generate the types from the api and color the card
async function renderPokemonTypes(i) {
    let pokemonType1 = allPokemons[i]['types'][0]['type']['name'];
    document.getElementById('pokemonCard' + i).classList.add(pokemonType1);
};
// loading the stats from api to JSON-array 
async function loadStats(i) {
    for (let j = 0; j < allPokemons[i]['stats'].length; j++) {
        xValue = allPokemons[i]['stats'][j]['base_stat'];
        yValue = allPokemons[i]['stats'][j]['stat']['name'];
        xdataValue.push(xValue);
        ydataValue.push(yValue);
    }
    pushStats(xdataValue, ydataValue);
};

function pushStats(xdataValue, ydataValue) {
    valuex = xdataValue.splice(0, 6);
    valuey = ydataValue.splice(0, 6);
    xdata.push(valuex);
    ydata.push(valuey);
};

function renderPokemonCards(i) {
    document.getElementById('pokemonCards').innerHTML += `
        <div id="pokemonCard${i}" class="card card-style" style="width: 18rem;" onclick="toggleCard(${i})">
        <div class="pokemonID" id="pokemonID${i}"></div>
        <img id="pokemonIcon${i}" src="" class="card-img-top img-style">
        <div id="card-body${i}" class="card-body card-body-style d-none">
            <div class="types">
                <div class="card style-types-box bg-success">
                    <div id="type-${i}" class="card-body style-types">
                        u.a.
                    </div>
                </div>
                <div class="card style-types-box bg-secondary ">
                    <div id="type-x${i}" class="card-body style-types">
                    </div>
                </div>
            </div>
            <div class="information">
                <div class="card-body information-box">
                    <span id="weight${i}"></span>
                    Weight
                </div>
                <div class="card-body information-box">
                    <span id="height${i}"></span>
                    Height
                </div>
            </div>
        `;
};

async function toggleCard(i) {
    await loadPokemon;
    pokemonType1 = allPokemons[i]['types'][0]['type']['name'];
    document.getElementById('window').classList.remove('d-none');
    //resetToggleCard(pokemonType1, i);
    loadPokeTypes(pokemonType1, i);
    loadtoggleCard(pokemonType1, i);
    loadtoggleInfos(i);
    loadtoggleStats(i);
};

function resetToggleCard(pokemonType1, i) {
    document.getElementById('pokemonID' + i).classList.remove(pokemonType1);
    document.getElementById('pokemonIcon' + i).classList.remove(pokemonType1);

};

function loadPokeTypes(pokemonType1, i) {
    document.getElementById('type-').parentNode.classList.add(pokemonType1);
    document.getElementById('image-window').classList.add(pokemonType1);
    document.getElementById('type-').innerHTML = pokemonType1;
    if (allPokemons[i]['types'].length > 1) {
        let pokemonType2 = allPokemons[i]['types'][1]['type']['name'];
        document.getElementById('type-x').parentNode.classList.add(pokemonType2);
        document.getElementById('type-x').innerHTML = pokemonType2;
    } else {
        document.getElementById('type-x').innerHTML = "u.a.";
        document.getElementById('type-x').parentNode.classList.add(pokemonType1);
        document.getElementById('type-x').innerHTML = pokemonType1;
    }
};

function loadtoggleCard(pokemonType1, i) {
    document.getElementById('card-window').classList.add('bg-selfblack');
    document.getElementById('image-window').src = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonID' + i).classList.add(pokemonType1);
    document.getElementById('pokemonIcon' + i).classList.add(pokemonType1);
    document.getElementById('pokemonID').innerHTML = '#' + allPokemons[i]['id'] + `
    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showPokemonModal(${i})" >
    view
    </button>
    `;
};

function loadtoggleInfos(i) {
    document.getElementById('windowPokemonName').innerHTML = allPokemons[i]['name'];
    document.getElementById('height').innerHTML = allPokemons[i]['height'];
    document.getElementById('weight').innerHTML = allPokemons[i]['weight'] + ' lbs';
};

function loadtoggleStats(i) {
    for (let x = 0; x < 5; x++) {
        document.getElementById(barValue[x]).style.width = allPokemons[i]['stats'][x]['base_stat'] + "%";
        document.getElementById(barValue[x]).innerHTML = `${allPokemons[i]['stats'][x]['base_stat']}/100 `;
    }
};

function closeWindow() {
    document.getElementById('type-').parentNode.classList.remove(pokemonType1);
    document.getElementById('image-window').classList.remove(pokemonType1);
    document.getElementById('window').classList.add('d-none');
};

async function showPokemonModal(i) {
    await loadPokemon;
    updateChart(i);
    loadModalImages(i);
    loadModalInfos(i);
};

function loadModalImages(i) {
    document.getElementById('pokemonIconModal').src = './images/pokeball.png';
    document.getElementById('pokemonIconModal').classList.add('swiggle');
    setTimeout(function () {
        document.getElementById('pokemonIconModal').src = allPokemons[i]['sprites']['other']['official-artwork']['front_default'];
    }, 1500)
    document.getElementById('secondIcon').src = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    setTimeout(function () {
        document.getElementById('pokemonIconModal').style = 'height: 100vh; opacity: 1';
    }, 1500)

};

function loadModalInfos(i) {
    document.getElementById('info-header').innerHTML = `${allPokemons[i]['name']}`;
    document.getElementById('info-height').innerHTML = `height: ${allPokemons[i]['height']}`;
    document.getElementById('info-weight').innerHTML = `weight: ${allPokemons[i]['weight']}lbs`;
    document.getElementById('info-type1').innerHTML = `types: ${allPokemons[i]['types'][0]['type']['name']}`;
    if (allPokemons[i]['types'].length > 1) {
        document.getElementById('info-type2').innerHTML = `types: ${allPokemons[i]['types'][1]['type']['name']}`;
    }
    document.getElementById('info-abilitie1').innerHTML = `abilitie: ${allPokemons[i]['abilities'][0]['ability']['name']}`;
    if (allPokemons[i]['types'].length > 1) {
        document.getElementById('info-abilitie2').innerHTML = `abilitie: ${allPokemons[i]['abilities'][1]['ability']['name']}`;
    }
};

function closeModal() {
    document.getElementById('pokemonIconModal').style = '';
}

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(211, 0, 0, 0.4)',
                'rgba(211, 0, 0, 0.2)',
                'rgba(0, 17, 211, 0.2)',
                'rgba(211, 179, 0, 0.2)',
                'rgba(0, 211, 183, 0.2)',
                'rgba(35, 183, 5, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(211, 0, 0, 0.4)',
                'rgba(211, 0, 0, 0.6)',
                'rgba(0, 17, 211, 0.6)',
                'rgba(211, 179, 0, 0.6)',
                'rgba(0, 211, 183, 0.6)',
                'rgba(35, 183, 5, 0.6)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        elements: {
            point: {

                radius: 10,
            }
        },
        layout: {
            padding: 0,
        },
        scale: {
            y: {
                beginAtZero: true
            },
            r: {
                display: false,
                backgroundColor: 'rgba(140, 140, 140, 0.2)',
                max: 110,
                min: 0,
                ticks: {
                    stepSize: 20,
                }
            },

        },
        plugins: {

            legend: {
                display: false,
                labels: {
                    font: {
                        size: 32
                    }
                },

            }
        }
    }
});

function updateChart(i) {
    myChart.data.datasets[0].data = xdata[i];
    myChart.update();
};
