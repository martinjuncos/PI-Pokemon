import React from "react";
import style from './Paginado.module.css'

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <div >
        {pageNumber &&
          pageNumber.map((n ) => (
            <button className={style.button} onClick={() => paginado(n)} key={n}>
              {n}
            </button>
          ))}
      </div>
    </nav>
  );
}
