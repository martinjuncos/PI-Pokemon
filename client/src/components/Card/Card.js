import React from "react";

export default function Card({ name, image, types }) {

  let typePokemon = types.map((e, index) => {
    const nameType = e.name ? e.name : e;
    return <h5 key={index}>{nameType}</h5>;
    
  });

  return (
    <div>
      <div>
        <h1>{name}</h1>
      </div>

      <div>
        <img src={image} alt="img not found" width="250" height="150" />
      </div>

      <div>{typePokemon}</div>
    </div>
  );
}
