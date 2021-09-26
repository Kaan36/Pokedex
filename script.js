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
let scrollSet = 0;
let setValue = 500;

window.onscroll = function () { myFunction() };

function myFunction() {
    scrollSet = setValue;
    if (limit < 121) {
        if (scrollY > scrollSet) {
            limit += 20;
            offset += 20;
            console.log('scrollY-limit:', limit)
            loadPokemon();
            setValue += 500;
        }
    }
};

async function loadPokemon() {
    for (let i = offset; i < limit; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/?offset=${offset}&limit=${limit}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
    }
    renderPokemonInfo()
};

async function renderPokemonInfo() {
    await loadPokemon;

    for (let i = offset; i < allPokemons.length; i++) {
        renderPokemonCards(i);
        let pokemonIcon = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
        document.getElementById('pokemonIcon' + i).src = pokemonIcon;

        let pokemonName = allPokemons[i]['name'];
        document.getElementById('pokemonName' + i).innerHTML = pokemonName;

        let pokemonHeight = allPokemons[i]['height'];
        document.getElementById('height' + i).innerHTML = pokemonHeight;

        let pokemonWeight = allPokemons[i]['weight'];
        document.getElementById('weight' + i).innerHTML = pokemonWeight + ' lbs';

        let pokemonID = allPokemons[i]['id'];
        document.getElementById('pokemonID' + i).innerHTML = '#' + pokemonID + `
        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showPokemonModal(${i})" >
      view
    </button>
        `;

        loadStats(i)
        renderPokemonTypes(i);

    }

};

async function renderPokemonTypes(i) {
    await loadPokemon;
    pokemonType1 = allPokemons[i]['types'][0]['type']['name'];

    if (pokemonType1 == pokemonElements[0][pokemonType1]) {
        document.getElementById('type-' + i).parentNode.classList.add(pokemonType1);
        document.getElementById('pokemonCard' + i).classList.add(pokemonType1);
        document.getElementById('type-' + i).innerHTML = pokemonType1;
    }
    if (allPokemons[i]['types'].length > 1) {
        pokemonType2 = allPokemons[i]['types'][1]['type']['name'];
        document.getElementById('type-x' + i).parentNode.classList.add(pokemonType2);
        document.getElementById('type-x' + i).innerHTML = pokemonType2;
    } else {
        document.getElementById('type-x' + i).innerHTML = "u.a.";
        document.getElementById('type-x' + i).parentNode.classList.add(pokemonType1);
        document.getElementById('type-x' + i).innerHTML = pokemonType1;
    }

};

async function loadStats(i) {
    await loadPokemon;
    for (let j = 0; j < allPokemons[i]['stats'].length; j++) {

        document.getElementById('hp' + i).style.width = allPokemons[i]['stats'][0]['base_stat'] + "%";
        document.getElementById('hp' + i).innerHTML = `${allPokemons[i]['stats'][0]['base_stat']}/100 `;
        document.getElementById('attack' + i).style.width = allPokemons[i]['stats'][1]['base_stat'] + "%";
        document.getElementById('attack' + i).innerHTML = `${allPokemons[i]['stats'][1]['base_stat']}/100 `;
        document.getElementById('defense' + i).style.width = allPokemons[i]['stats'][2]['base_stat'] + "%";
        document.getElementById('defense' + i).innerHTML = `${allPokemons[i]['stats'][2]['base_stat']}/100 `;
        document.getElementById('speed' + i).style.width = allPokemons[i]['stats'][3]['base_stat'] + "%";
        document.getElementById('speed' + i).innerHTML = `${allPokemons[i]['stats'][3]['base_stat']}/100 `;
        document.getElementById('special-attack' + i).style.width = allPokemons[i]['stats'][4]['base_stat'] + "%";
        document.getElementById('special-attack' + i).innerHTML = `${allPokemons[i]['stats'][4]['base_stat']}/100 `;

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
        
        <div id="card-body${i}" class="card-body card-body-style">
            <div class="center">
                <h5 class="card-title" id="pokemonName${i}">Card title</h5>
            </div>
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

            <div class="chartBox">   
            <span>hp</span>  
            <div  class="progress bg-light">
            <div id="hp${i}" class="progress-bar bg-danger" role="progressbar" style="width: 0%"  aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress bg-light">
            <div id="attack${i}" class="progress-bar bg-warning" role="progressbar" style="width: 0%"  aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress bg-light">
            <div id="defense${i}" class="progress-bar bg-primary" role="progressbar" style="width: 0%"  aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress bg-light">
            <div id="speed${i}" class="progress-bar bg-secondary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
            </div>
            <div class="progress bg-light">
            <div  id="special-attack${i}" class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
            </div>
        </div>
        </div>

        `;

};

function toggleCardBody(i) {


    var x = document.getElementById("card-body" + i);
    pokemonType1 = allPokemons[i]['types'][0]['type']['name'];

    if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById('pokemonCard' + i).classList.add('background');

        document.getElementById('pokemonID' + i).classList.add(pokemonType1);
        document.getElementById('pokemonIcon' + i).classList.add(pokemonType1);

    } else {
        x.style.display = "none";
        document.getElementById('pokemonCard' + i).classList.remove('background');

    }
};

async function showPokemonModal(i) {
    await loadPokemon;
    updateChart(i);

    let pokemonName = allPokemons[i]['name'];
    document.getElementById('info-header').innerHTML = `${pokemonName}`;

    let pokemonIcon = allPokemons[i]['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonIconModal').src = pokemonIcon;
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
                'rgba(211, 0, 0, 0.2)',
                'rgba(211, 0, 0, 0.2)',
                'rgba(0, 17, 211, 0.2)',
                'rgba(211, 179, 0, 0.2)',
                'rgba(0, 211, 183, 0.2)',
                'rgba(35, 183, 5, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(0, 0, 0, 0.2)',
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

                radius: 20,
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
