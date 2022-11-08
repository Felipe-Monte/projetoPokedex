let pokeName = document.querySelector('.span-name');
let pokeNumber = document.querySelector('.span-number');
let pokeImage = document.getElementById('img-pokemon')

let form = document.querySelector('form')
let text = document.getElementById('itexto')

let btnNext = document.getElementById('btn-next')
let btnPrev = document.getElementById('btn-prev')

let searchPokemon = 1

const fetchPokemon = async function (pokemon) {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIresponse.status == 200) {
        const data = await APIresponse.json();
        return data
    }
}

const pokemonRender = async function (pokemon) {
    pokeName.innerHTML = 'Loading'
    pokeImage.src = 'images/loading.gif'

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokeImage.style.display = 'block'
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        searchPokemon = data.id;

        console.log(data)
        text.value = ''
    } else {
        pokeName.innerHTML = 'Not Found'
        pokeNumber.innerHTML = ''
        pokeImage.style.display = 'none'
    }

}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    pokemonRender(text.value.toLowerCase())

})

pokemonRender(searchPokemon);

btnNext.addEventListener('click', function () {
    if (searchPokemon <= 906) {
        searchPokemon += 1;
        pokemonRender(searchPokemon);
    }
})

btnPrev.addEventListener('click', function () {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        pokemonRender(searchPokemon);
    }
})