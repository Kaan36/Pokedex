let pokemonElements = [{ 'normal': 'normal', 'fighting': 'fighting', 'flying': 'flying', 'poison': 'poison', 'ground': 'ground', 'rock': 'rock', 'bug': 'bug', 'ghost': 'ghost', 'steel': 'steel', 'fire': 'fire', 'water': 'water', 'grass': 'grass', 'electric': 'electric', 'psychic': 'psychic', 'ice': 'ice', 'dragon': 'dragon', 'dark': 'dark', 'fairy': 'fairy' }];
let currentPokemon = [];
let pokemonStatsBase;
let pokemonStatsName;
let xdata = [1, 2, 3, 10];
let ydata = ["fire", "water", "push", "atom"];
let pokemonType;
let loadedPokemons;
let pokemonSlot;


async function loadPokemons() {
    //mainDataPokemons['id'].forEach(loadedPokemons);
    for (let i = 1; i < 21; i++) {
        loadedPokemons = i;
        renderPokemonCards(i);
        loadPokemon(loadedPokemons, i);
      
    }
};

async function loadPokemon(loadedPokemons, i) {
    await loadPokemons;
    let url = `https://pokeapi.co/api/v2/pokemon/${loadedPokemons}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon);

    renderPokemonInfo(currentPokemon, i);
    //loadStats();
    loadCharts(loadedPokemons, i);
};

async function renderPokemonInfo(currentPokemon, i) {
    await loadPokemon;

    let pokemonIcon = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonIcon' + i).src = pokemonIcon;

    let pokemonName = currentPokemon['name'];
    document.getElementById('pokemonName' + i).innerHTML = pokemonName;

    let pokemonHeight = currentPokemon['height'];
    document.getElementById('height' + i).innerHTML = pokemonHeight;

    let pokemonWeight = currentPokemon['weight'];
    document.getElementById('weight' + i).innerHTML = pokemonWeight + ' lbs';

    let pokemonID = currentPokemon['id'];
    document.getElementById('pokemonID' + i).innerHTML = '#' + pokemonID;

    renderPokemonTypes(currentPokemon, i);


};

async function loadCharts(loadedPokemons, i) {

    //setup

    const data = {

        labels: ydata,
        datasets: [{
            label: 'stats',
            data: xdata,
            backgroundColor: [
                'rgba(255, 255, 255, 0.6)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    // config

    const config = {
        type: 'radar',
        data,
        options: {
            elements: {
                point: {

                    radius: 6,
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
                    backgroundColor: 'rgba(140, 140, 140)',
                    max: 100,
                    min: 0,
                    ticks: {
                        stepSize: 100,
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
    };

    // render init block
    
        const myChart = new Chart(
            document.getElementById('myChart' + i),
            config 
            );

};


async function renderPokemonTypes(currentPokemon, i) {

    await loadPokemon;
    // pokemonType2 = currentPokemon['types'][1]['type']['name'];

    for (let j = 0; j < 1; j++) {
        pokemonType = currentPokemon['types'][j]['type']['name'];

        if (pokemonType == pokemonElements[0][pokemonType]) {
            document.getElementById('type-' + i).parentNode.classList.add(pokemonType);
            document.getElementById('pokemonCard' + i).classList.add(pokemonType);
            document.getElementById('type-' + i).innerHTML = pokemonType;
        }
    };

};

function renderPokemonCards(i) {

    document.getElementById('pokemonCards').innerHTML += `
        <div id="pokemonCard${i}" class="card margin" style="width: 18rem;">
        <span id="pokemonID${i}"></span>
        <img id="pokemonIcon${i}" src="" class="card-img-top border-radius">

        <div class="card-body padding-bottom">
            <div class="center">
                <h5 class="card-title" id="pokemonName${i}">Card title</h5>
            </div>
            <div class="types">
                <div class="card style-types-box bg-success">
                    <div id="type-${i}" class="card-body style-types">
                        u.a.
                    </div>
                </div>

                <div class="card style-types-box bg-success">
                    <div id="type-${i}" class="card-body style-types">
                        u.a.
                    </div>
                </div>
            </div>

            <div class="information">
                <div class="card-body column">
                    <span id="weight${i}"></span>
                    Weight
                </div>



                <div class="card-body column">
                    <span id="height${i}"></span>
                    Height
                </div>
            </div>

            <div class="chartBox">     
             <canvas id="myChart${i}"></canvas>
            </div>
            
          
        </div>

        </div>
        `;

};