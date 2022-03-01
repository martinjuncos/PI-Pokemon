import React from "react";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filterPokemonsByType,
  filterCreated,
  orderByName,
  orderByStrange,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  let allPokemons = useSelector((state) => state.pokemons);
  const allPokemonsFilter = useSelector((state) => state.filter);

  const [, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;
  let currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //           TYPES DE LOS 40 POKEMONS API + BASE DE DATOS

  const objType = allPokemonsFilter.map((p) => p.types);
  const ArrType = [];
  objType.map((e) => e.forEach((l) => ArrType.push(l.name ? l.name : l)));
  const types = [...new Set(ArrType)];


  //            USE EFFECT

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  //           HANDLERS

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterPokemonsByType(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  }

  function handleSortStrange(e) {
    e.preventDefault();
    dispatch(orderByStrange(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  }

  return (
    <div className={style.container}>

      <div className= {style.cabecera}>
      <h1 className= {style.tituloHome}> POKEMON API </h1>
      <button className= {style.buttonCarga} onClick={(e) => {handleClick(e)}}>
        Cargar todos los Pokemons
      </button>
      </div>

      <div className= {style.menu}>
      <SearchBar />
      <Link to="/pokemons">
        <button className= {style.buttonCarga}>Crear Pokemon</button>
      </Link>

      </div>

      <div className= {style.lateral}>
        <div>
          <label className={style.label}>Ordenar por Nombre</label>
          <select
            className={style.select}
            onChange={(e) => {
              handleSort(e);
            }}
          >
            <option value="abc">A-Z</option>
            <option value="zyx">Z-A</option>
          </select>

          <label className={style.label}>Ordenar por Ataque</label>
          <select
            className={style.select}
            onChange={(e) => {
              handleSortStrange(e);
            }}
          >
            <option value="fuerza-">Attack -</option>
            <option value="fuerza+">Attack +</option>
          </select>

          <label className={style.label}>Ordenar por Origen</label>
          <select
            className={style.select}
            onChange={(e) => {
              handleFilterCreated(e);
            }}
          >
            <option value="all">All</option>
            <option value="api">Pokedex</option>
            <option value="created">Created</option>
          </select>

          <label className={style.label}>Ordenar por Tipo</label>
          <select
            className={style.select}
            onChange={(e) => {
              handleFilterType(e);
            }}
          >
            <option value="all">All</option>
            {types?.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className= {style.contenido}>
         <div>
        {allPokemons && (
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
        )}
      </div>
      <div className={style.card}> 
      {currentPokemons?.map((el, i) => {
        return (
          <div key= {i}>
            <Link to={`/pokemon/${el.id}`}>
              <Card
                key={i}
                name={el.name}
                image={el.image}
                types={el.types}
              />
            </Link>
          </div>
        );
      })}
      </div>
      </div>

     
      
    </div>
  );
}
