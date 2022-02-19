import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPokemons,
  getTypes,
  filterPokemonsByType,
  filterCreated,
  orderByName,
  orderByStrange,
} from '../../actions/index'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado'
import SearchBar from '../SearchBar/SearchBar'

export default function Home() {
  const dispatch = useDispatch()
  let allPokemons = useSelector((state) => state.pokemons)
  const allPokemonsFilter = useSelector((state) => state.filter)

  const [ setOrder] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonsPerPage] = useState(12)
  const lastPokemon = currentPage * pokemonsPerPage
  const firstPokemon = lastPokemon - pokemonsPerPage
  let currentPokemons = allPokemons.slice(firstPokemon, lastPokemon)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //           TYPES DE LOS 40 POKEMONS API + BASE DE DATOS          

  const objType = allPokemonsFilter.map((p) => p.types)
  const ArrType = []
  objType.map((e) => e.forEach((l) => ArrType.push(l.name ? l.name : l)))
  const types = [...new Set(ArrType)]

  //            USE EFFECT        

  useEffect(() => {
    dispatch(getPokemons())
    dispatch(getTypes())
  }, [dispatch])

  //           HANDLERS          

  function handleClick(e){
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterType(e) {
    e.preventDefault()
    dispatch(filterPokemonsByType(e.target.value))
    setCurrentPage(1)
  }

  function handleFilterCreated(e) {
    e.preventDefault()
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
  }

  function handleSort(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
    setCurrentPage(1)
  }

  function handleSortStrange(e) {
    e.preventDefault()
    dispatch(orderByStrange(e.target.value))
    setOrder(`Ordenado ${e.target.value}`)
    setCurrentPage(1)
  }

  return (
    <div>
      <Link to="/pokemons">
            <button>Crear Pokemon</button>
      </Link>

      <h1> POKEMON API </h1>
      <button onClick= {(e) => {handleClick(e)}}>Cargar todos los Pokemons</button>
      <div>
        <div>
          <select
            onChange={(e) => {
              handleSort(e)
            }}
          >
            <option value="abc">A-Z</option>
            <option value="zyx">Z-A</option>
          </select>

          <select
            onChange={(e) => {
              handleSortStrange(e)
            }}
          >
            <option value="fuerza-">Attack -</option>
            <option value="fuerza+">Attack +</option>
          </select>

          <select
            onChange={(e) => {
              handleFilterCreated(e)
            }}
          >
            <option value="all">All</option>
            <option value="api">Pokedex</option>
            <option value="created">Created</option>
          </select>
          <select
            onChange={(e) => {
              handleFilterType(e)
            }}
          >
            <option value="all">All</option>

            {types?.map((t, index) => (
              <option key={index} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <SearchBar/>
      </div>

      <div>
        {allPokemons && (
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
        )}
      </div>


          {
          currentPokemons?.map((el, i) =>{
            return(
              <div>
                <Link to={`/pokemon/${el.id}`}>
                <Card key={i} name={el.name} image={el.image} types={el.types} attack={el.attack} />
                </Link>
              </div>
            )
          })
          }

      
    </div>
  )
}
