let pokemonElements = [{ 'normal': 'normal', 'fighting': 'fighting', 'flying': 'flying', 'poison': 'poison', 'ground': 'ground', 'rock': 'rock', 'bug': 'bug', 'ghost': 'ghost', 'steel': 'steel', 'fire': 'fire', 'water': 'water', 'grass': 'grass', 'electric': 'electric', 'psychic': 'psychic', 'ice': 'ice', 'dragon': 'dragon', 'dark': 'dark', 'fairy': 'fairy' }];
let currentPokemon = [];
let pokemonStatsBase;
let pokemonStatsName;
let xdata = [[1, 2, 3, 10]];
let ydata = [["fire", "water", "push", "atom"]];
let pokemonType;
let loadedPokemons;
let xdataValue = [];
let ydataValue = [];
let xValue;
let yValue;
let valuex;
let valuey;
let counter = 21;

async function loadPokemons() {
    //mainDataPokemons['id'].forEach(loadedPokemons);
    for (let i = 1; i < counter; i++) {
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
    document.getElementById('pokemonID' + i).innerHTML = '#' + pokemonID + `
    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showPokemonModal(${i})">
  view
</button>
    `;

    renderPokemonTypes(currentPokemon, i);


};

async function renderPokemonTypes(currentPokemon, i) {

    await loadPokemon;
    // pokemonType2 = currentPokemon['types'][1]['type']['name'];

    // for (let j = 0; j < currentPokemon['types'].length; j++) {
    pokemonType1 = currentPokemon['types'][0]['type']['name'];


    if (pokemonType1 == pokemonElements[0][pokemonType1]) {
        document.getElementById('type-' + i).parentNode.classList.add(pokemonType1);
        document.getElementById('pokemonCard' + i).classList.add(pokemonType1);
        document.getElementById('type-' + i).innerHTML = pokemonType1;
    }

    if (currentPokemon['types'].length > 1) {
        pokemonType2 = currentPokemon['types'][1]['type']['name'];
        document.getElementById('type-x' + i).parentNode.classList.add(pokemonType2);
        document.getElementById('type-x' + i).innerHTML = pokemonType2;
    } else {
        document.getElementById('type-x' + i).innerHTML = "u.a.";
        document.getElementById('type-x' + i).parentNode.classList.add(pokemonType1);
        document.getElementById('type-x' + i).innerHTML = pokemonType1;

    }

    //};
    loadStats(currentPokemon, i);
};

async function loadStats(currentPokemon, i) {
    await loadPokemon;

    for (let j = 0; j < currentPokemon['stats'].length; j++) {
        xValue = currentPokemon['stats'][j]['base_stat'];
        yValue = currentPokemon['stats'][j]['stat']['name'];
        console.log('loadStats counter:', currentPokemon);
        xdataValue.push(xValue);
        ydataValue.push(yValue);
        console.log('xdataValue:', xdataValue)
    }
    console.log('xdata:', xdata)
    valuex = xdataValue.splice(0, 6);
    valuey = ydataValue.splice(0, 6);
    xdata.push(valuex);
    ydata.push(valuey);

    loadCharts(i);
};

async function loadCharts(i) {
    await loadStats;
    //setup
    const data = {

        labels: ydata[i],
        datasets: [{
            label: 'stats',
            data: xdata[i],
            backgroundColor: [
                'rgba(255, 255, 255, 0.6)',
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
                    max: 110,
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
             <canvas id="myChart${i}"></canvas>
            </div>
        </div>
        </div>

        <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header black">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body modal-style">
      <video autoplay muted loop id="myVideo">
  <source src="videos/pokeball.mp4" type="video/mp4">
</video>
<img id="pokemonIconModal" src="">
       
      </div>
     
    </div>
  </div>
</div>

        `;

};

function toggleCardBody(i) {
    var x = document.getElementById("card-body" + i);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};

async function showPokemonModal(i){
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response =  await fetch(url);
    currentPokemon = await response.json();
    let pokemonIcon = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonIconModal').src = pokemonIcon;
}

//function onScroll() {
//    if(scrollY > 200){
//        counter += 20;
//    }
//    loadPokemons();
//}