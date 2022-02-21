import React from "react";
import style from './Card.module.css'

export default function Card({ name, image, types }) {

  let typePokemon = types.map((e, index) => {
    const nameType = e.name ? e.name : e;
    return <li key={index}>{nameType}</li>;
    
  });

  return (
      <div> 
        <div  className={style.block}>
        <br/>

        

      <div className= {style.neon}>
        <h1>{name}</h1>
      </div>

      <div>
        <img src={image} alt="img not found" width="250" height="150" />
      </div>

      <div>
        <h4>{typePokemon}</h4>
      </div>
      <br/>
</div>
      </div>

  );
}
