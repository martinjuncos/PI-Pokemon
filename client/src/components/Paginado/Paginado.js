import React from "react";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <div>
        {pageNumber &&
          pageNumber.map((n ) => (
            <button  onClick={() => paginado(n)} key={n}>
              {n}
            </button>
          ))}
      </div>
    </nav>
  );
}
