import React from "react";
import style from './Card.module.css'

export default function Card({ name, image, types }) {

  let typePokemon = types.map((e, index) => {
    const nameType = e.name ? e.name : e;
    return <p key={index}>{nameType}</p>;
    
  });

 

  return (
      <div> 
        <div  className={style.block}>
        <br/>

        

      <div className= {style.neon}>
        <h1 className={style.nombre}>{name}</h1>
      </div>

      <div>
        <img src={image} alt="img not found" width="150" height="150" />
      </div>

      <div>
        <h4>{typePokemon}</h4>
      </div>
      <br/>
</div>
      </div>

  );
}
