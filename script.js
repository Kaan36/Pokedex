let pokemonElements = [{ 'normal': 'normal', 'fighting': 'fighting', 'flying': 'flying', 'poison': 'poison', 'ground': 'ground', 'rock': 'rock', 'bug': 'bug', 'ghost': 'ghost', 'steel': 'steel', 'fire': 'fire', 'water': 'water', 'grass': 'grass', 'electric': 'electric', 'psychic': 'psychic', 'ice': 'ice', 'dragon': 'dragon', 'dark': 'dark', 'fairy': 'fairy' }];
let currentPokemon = [];
let allPokemons = [];
let data = [[1, 2, 3, 10]];
let label = [["fire", "water", "push", "atom"]];
let pokemonType;
let loadedPokemons;
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

let scrolling = false;

window.onscroll = () => {
    scrolling = true;
};

setInterval(() => {
    if (scrolling) {
        scrolling = false;

        if (limit < 141) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

                limit += 20;
                offset += 20;
                loadPokemon();
                console.log('onscroll limit:', limit);
                console.log('onscroll offset:', offset);
            }
            // place the scroll handling logic here
        }
    }
}, 300);

async function loadPokemon() {

    for (let i = offset; i < limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/?offset=${offset}&limit=${limit}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
    }
    renderPokemonInfo()
};

function filterPosts() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    console.log(search);

    let renderSearch = document.getElementById('pokemonCards');
    renderSearch.innerHTML = '';

    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i]['name'].includes(search)) {

            renderSearch.innerHTML += `
    
    <div id="pokemonCard${i}" class="card card-style" style="width: 18rem;" onclick="toggleCardBody(${i})">
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
        }
    }

};

async function renderPokemonInfo() {

    let offsetValue = offset - 1;

    for (let i = offsetValue; i < allPokemons.length; i++) {
        renderPokemonCards(i);
        let pokemonIcon = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
        document.getElementById('pokemonIcon' + i).src = pokemonIcon;

        let pokemonID = allPokemons[i]['id'];
        document.getElementById('pokemonID' + i).innerHTML = '#' + pokemonID + `
        <h5 class="card-title">${allPokemons[i]['name']}</h5>
        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showPokemonModal(${i})" >
      view
    </button>
        `;

        loadStats(i)
        renderPokemonTypes(i);
    }

};

async function renderPokemonTypes(i) {
    pokemonType1 = allPokemons[i]['types'][0]['type']['name'];
    if (pokemonType1 == pokemonElements[0][pokemonType1]) {
        document.getElementById('pokemonCard' + i).classList.add(pokemonType1);
    }


};

async function loadStats(i) {
    for (let j = 0; j < allPokemons[i]['stats'].length; j++) {
        xValue = allPokemons[i]['stats'][j]['base_stat'];
        yValue = allPokemons[i]['stats'][j]['stat']['name'];
        xdataValue.push(xValue);
        ydataValue.push(yValue);
    }
    valuex = xdataValue.splice(0, 6);
    valuey = ydataValue.splice(0, 6);
    xdata.push(valuex);
    ydata.push(valuey);

};

function renderPokemonCards(i) {

    document.getElementById('pokemonCards').innerHTML += `
    
        <div id="pokemonCard${i}" class="card card-style" style="width: 18rem;" onclick="toggleCardBody(${i})">
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

async function toggleCardBody(i) {
    await loadPokemon;
    await renderPokemonCards;

    document.getElementById('pokemonID' + i).classList.remove(pokemonType1);
    document.getElementById('pokemonIcon' + i).classList.remove(pokemonType1);
    document.getElementById('type-').parentNode.classList.remove(pokemonType1);
    document.getElementById('image-window').classList.remove(pokemonType1);


    let windowBox = document.getElementById('window');
    windowBox.classList.remove('d-none');
    document.getElementById('card-window').classList.add('bg-selfblack');

    let pokemonID = allPokemons[i]['id'];
    document.getElementById('pokemonID').innerHTML = '#' + pokemonID + `
    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showPokemonModal(${i})" >
  view
</button>
    `;

    let pokemonWindowIcon = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('image-window').src = pokemonWindowIcon;
    pokemonType1 = allPokemons[i]['types'][0]['type']['name'];
    document.getElementById('pokemonID' + i).classList.add(pokemonType1);
    document.getElementById('pokemonIcon' + i).classList.add(pokemonType1);

    if (pokemonType1 == pokemonElements[0][pokemonType1]) {
        document.getElementById('type-').parentNode.classList.add(pokemonType1);
        document.getElementById('image-window').classList.add(pokemonType1);
        document.getElementById('type-').innerHTML = pokemonType1;
    }
    if (allPokemons[i]['types'].length > 1) {
        pokemonType2 = allPokemons[i]['types'][1]['type']['name'];
        document.getElementById('type-x').parentNode.classList.add(pokemonType2);
        document.getElementById('type-x').innerHTML = pokemonType2;
    } else {
        document.getElementById('type-x').innerHTML = "u.a.";
        document.getElementById('type-x').parentNode.classList.add(pokemonType1);
        document.getElementById('type-x').innerHTML = pokemonType1;
    }

   
    document.getElementById('windowPokemonName').innerHTML = allPokemons[i]['name'];
    document.getElementById('height').innerHTML = allPokemons[i]['height'];
    document.getElementById('weight').innerHTML = allPokemons[i]['weight'] + ' lbs';


    document.getElementById('hp').style.width = allPokemons[i]['stats'][0]['base_stat'] + "%";
    document.getElementById('hp').innerHTML = `${allPokemons[i]['stats'][0]['base_stat']}/100 `;
    document.getElementById('attack').style.width = allPokemons[i]['stats'][1]['base_stat'] + "%";
    document.getElementById('attack').innerHTML = `${allPokemons[i]['stats'][1]['base_stat']}/100 `;
    document.getElementById('defense').style.width = allPokemons[i]['stats'][2]['base_stat'] + "%";
    document.getElementById('defense').innerHTML = `${allPokemons[i]['stats'][2]['base_stat']}/100 `;
    document.getElementById('speed').style.width = allPokemons[i]['stats'][3]['base_stat'] + "%";
    document.getElementById('speed').innerHTML = `${allPokemons[i]['stats'][3]['base_stat']}/100 `;
    document.getElementById('special-attack').style.width = allPokemons[i]['stats'][4]['base_stat'] + "%";
    document.getElementById('special-attack').innerHTML = `${allPokemons[i]['stats'][4]['base_stat']}/100 `;


    for (let j = 0; j < allPokemons[i]['types'].length; j++) {
        document.getElementById('types') += `<div class="${allPokemons[i]['types'][j]['type']['name']}"></div>`
    }

};

function closeWindow() {
    document.getElementById('window').classList.add('d-none');
}

async function showPokemonModal(i) {
    await loadPokemon;
    updateChart(i);

    let pokemonIcon = allPokemons[i]['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonIconModal').src = pokemonIcon;

    let pokemonIcon2 = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    document.getElementById('secondIcon').src = pokemonIcon2;

    let pokemonName = allPokemons[i]['name'];
    document.getElementById('info-header').innerHTML = `${pokemonName}`;
    let pokemonHeight = allPokemons[i]['height'];
    document.getElementById('info-height').innerHTML = `weight: ${pokemonHeight}
    
    `;
    let pokemonWeight = allPokemons[i]['weight'];
    document.getElementById('info-weight').innerHTML = `weight: ${pokemonWeight}
    lbs
    `;
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
