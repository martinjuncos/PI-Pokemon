const { Router } = require('express')
const {
  getAllPokemons,
  getPokemonByIdApi,
  getPokemonByIdDb,
  getPokemonByNameApi,
  getPokemonByNameDb,
} = require('../controllers/pokemonController')
const { Pokemon, Type } = require('../db')
const router = Router()

//          GET POKEMOS / NAME         

router.get('/', async (req, res) => {
  const name = req.query.name

  if (!name) {
    const allPokemon = await getAllPokemons()
    res.send(allPokemon)
  } else {
    let pokemonDb = await getPokemonByNameDb(name)
    let pokemonApi = await getPokemonByNameApi(name)

    let pokemonByName

    if (pokemonDb && pokemonDb !== 'Pokemon no encontrado') {
      pokemonByName = pokemonDb
    }
    if (pokemonApi && pokemonApi !== 'Pokemon no encontrado') {
      pokemonByName = [pokemonApi]
    }

    if (pokemonByName.length > 0) {
      res.send(pokemonByName)
    } else {
      res.status(404).send('Pokemon no encontrado')
    }
  }
})

//          GET POKEMOS ID         

router.get('/:id', async (req, res, next) => {

  try {
    const { id } = req.params
    if (id.length < 5) {
      let searchIdApi = await getPokemonByIdApi(id)
      res.status(200).send(searchIdApi)
    } else {
      let searchIdDb = await getPokemonByIdDb(id)
      res.status(200).send(searchIdDb)
    }
  } catch (error) {
    res.status(404).send('Error')
  }
})

//          POST POKEMON         

router.post('/', async (req, res, next) => {
  try {
    let {
      name,
      types,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      createInDb,
    } = req.body

    let allPokemons = await getAllPokemons()

    let repeatPokemon = allPokemons.filter(
      (e) => e.name.toLowerCase() === name.toLowerCase(),
    )

    if (repeatPokemon.length) {
      res.status(400).send('Ya existe un Pokemon con ese nombre')
    } else {
      const newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        createInDb,
      })

      types.map(async (t) => {
        const newType = await Type.findAll({
          where: {
            name: t,
          },
        })
        newPokemon.addType(newType[0])
      })

      res.status(200).send('Pokemon agregado con exito')
    }
  } catch (error) {
    console.log('soy el error de post', error)
    res.status(404).send('No se pudo agregar pokemon')
  }
})

module.exports = router
