const axios = require('axios')
const { Pokemon, Type } = require('../db')

//          TRAER POKEMON DE LA API

const getPokemonApi = async () => {
  try {
    const dataApi = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const dataApi2 = await axios.get(dataApi.data.next)

    const dataPokemon = dataApi.data.results.map((e) => axios.get(e.url))
    const dataPokemon2 = dataApi2.data.results.map((e) => axios.get(e.url))

    const concatPokemon = dataPokemon.concat(dataPokemon2)

    const promisePokemon = await Promise.all(concatPokemon).then((e) => {
      let pokemon = e.map((e) => e.data)

      let pokemonsApi = []
      pokemon.map((e) => {
        pokemonsApi.push({
          id: e.id,
          name: e.name,
          types: e.types.map((e) => e.type.name),
          hp: e.stats[0].base_stat,
          attack: e.stats[1].base_stat,
          defense: e.stats[2].base_stat,
          speed: e.stats[5].base_stat,
          height: e.height,
          weight: e.weight,
          image: e.sprites.other.dream_world.front_default,
        })
      })

      return pokemonsApi
    })

    return promisePokemon
  } catch (error) {
    console.log(error)
  }
}

//         TRAER POKEMON DE LA BD

const getPokemonDb = async () => {
  try {
    const pokemonsDb = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributer: [],
        },
      },
    })

    return pokemonsDb
  } catch (error) {
    console.log(error)
  }
}

//          JUNTAR POKEMONS API Y DB

const getAllPokemons = async () => {
  try {
    let pokemonApi = await getPokemonApi()
    let pokemonDb = await getPokemonDb()
    let allPokemon = pokemonApi.concat(pokemonDb)
    return allPokemon
  } catch (error) {
    console.log(error)
  }
}

//          BUSCAR POKEMON POR ID DB

const getPokemonByIdDb = async (id) => {
  try {
    let searchIdDb = await Pokemon.findByPk(id, { include: { model: Type } })

    let searchIdPokemonDb = {
      id: searchIdDb.id,
      image: searchIdDb.image,
      name: searchIdDb.name,
      types: searchIdDb.types.map((t) => t.name),
      hp: searchIdDb.hp,
      attack: searchIdDb.attack,
      defense: searchIdDb.defense,
      speed: searchIdDb.speed,
      height: searchIdDb.height,
      weight: searchIdDb.weight,
    }

    return searchIdPokemonDb
  } catch (error) {
    return 'Pokemon no encontrado'
  }
}

//          BUSCAR POKEMON POR ID API

const getPokemonByIdApi = async (id) => {
  try {
    let searchIdApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

    if (searchIdApi) {
      let searchIdPokemonApi = {
        id: searchIdApi.data.id,
        name: searchIdApi.data.name,
        types: searchIdApi.data.types.map((e) => e.type.name),
        hp: searchIdApi.data.stats[0].base_stat,
        attack: searchIdApi.data.stats[1].base_stat,
        defense: searchIdApi.data.stats[2].base_stat,
        speed: searchIdApi.data.stats[5].base_stat,
        height: searchIdApi.data.height,
        weight: searchIdApi.data.weight,
        image: searchIdApi.data.sprites.other.dream_world.front_default,
      }

      return searchIdPokemonApi
    }
  } catch (error) {
    return 'Pokemon no encontrado'
  }
}

//          BUSCAR POKEMON POR NAME API

const getPokemonByNameApi = async (name) => {
  try {
    let nameApi = name.toLowerCase()
    const pokemonApi = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${nameApi}/`,
    )

    let nameSearchApi = {
      id: pokemonApi.data.id,
      name: pokemonApi.data.name,
      types: pokemonApi.data.types.map((e) => e.type.name),
      hp: pokemonApi.data.stats[0].base_stat,
      attack: pokemonApi.data.stats[1].base_stat,
      defense: pokemonApi.data.stats[2].base_stat,
      speed: pokemonApi.data.stats[5].base_stat,
      height: pokemonApi.data.height,
      weight: pokemonApi.data.weight,
      image: pokemonApi.data.sprites.other.dream_world.front_default,
    }

    return nameSearchApi
  } catch (error) {
    return 'Pokemon no encontrado'
  }
}

//          BUSCAR POKEMON POR NAME DB

const getPokemonByNameDb = async (name) => {
  const pokemonsDb2 = await getPokemonDb()
  const pokemonsDb2Filter = pokemonsDb2.filter(
    (p) => p.name.toLowerCase() === name.toLowerCase(),
  )
  return pokemonsDb2Filter
}

module.exports = {
  getPokemonApi,
  getPokemonDb,
  getAllPokemons,
  getPokemonByIdApi,
  getPokemonByIdDb,
  getPokemonByNameApi,
  getPokemonByNameDb,
}
