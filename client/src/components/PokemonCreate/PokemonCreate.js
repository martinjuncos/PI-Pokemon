import React from "react";
import style from './PokemonCreate.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { postPokemon, getTypes, getPokemons } from "../../actions/index";

export default function PokemonCreate() {

  const dispatch = useDispatch();
  const types = useSelector((state) => state.allTypes);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
    }))   
  }

  function handleSelect(e) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
  }  
  
  function handleSubmit(e){
      e.preventDefault();
      dispatch(postPokemon(input))
      alert('Personaje creado!')
      setInput({
        name: "",
        types: [],
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
      })
  }

  function handleDelete(ty, e) {
    e.preventDefault();
    setInput({
      ...input,
      types: input.types.filter((t) => t !== ty),
    });
  }

  function validate(input){
    let errors= {};
    if (!input.name){
      errors.name= 'Se requiere un nombre';
    } else if(!input.hp){
      errors.hp= 'Cargar el hp';
    } else if(!input.attack){
      errors.attack= 'Cargar el attack';
    } else if(!input.defense){
      errors.defense= 'Cargar el defense';
    } else if(!input.speed){
      errors.speed= 'Cargar el speed';
    }
    return errors;
  }
  

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div className={style.block}>

      <div  > 
      <Link to="/home">
        <button className= {style.buttonVolver}>Volver</button>
      </Link>
      </div>

      <div > 
      <h1 className={style.tituloCreate}>Crear Pokemon</h1>
      </div>

      <div className={style.fomulario}> 
      <form  onSubmit={(e) => handleSubmit(e)}>

        <div>
          <label >Nombre</label>
          <input  className={style.inputName} onChange={(e) => handleChange(e)} value={input.name} type="text" name="name" />
          {errors.name && (
            <p className= 'error' >{errors.name}</p>
          )}
        </div>

        

        <div>
          <label>Hp</label>
          <input  onChange={(e) => handleChange(e)} value={input.hp} type="text" name="hp" />
          {errors.hp && (
            <p className= 'error' >{errors.hp}</p>
          )}
        </div>

        <div>
          <label>Attack</label>
          <input  onChange={(e) => handleChange(e)} value={input.attack} type="text" name="attack" />
          {errors.attack && (
            <p className= 'error' >{errors.attack}</p>
          )}
        </div>

        <div>
          <label>defense</label>
          <input onChange={(e) => handleChange(e)} value={input.defense} type="text" name="defense" />
          {errors.defense && (
            <p className= 'error' >{errors.defense}</p>
          )}
        </div>

        <div>
          <label>Speed</label>
          <input  onChange={(e) => handleChange(e)} value={input.speed} type="text" name="speed" />
          {errors.speed && (
            <p className= 'error' >{errors.speed}</p>
          )}
        </div>

        <div>
          <label>Height</label>
          <input  onChange={(e) => handleChange(e)} value={input.height} type="text" name="height" />
        </div>

        <div>
          <label>weight</label>
          <input  onChange={(e) => handleChange(e)} value={input.weight} type="text" name="weight" />
        </div>

        <div>
          <label>Imagen</label>
          <input  onChange={(e) => handleChange(e)} value={input.image} type="text" name="image" />
        </div>

        <div>
          <label>Tipo</label>
          <select className={style.select} onChange={(e) => handleSelect(e)}>
            {types.map((t, index) => (
              <option key={index} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
        {input.types.map((ty, index) => (
                  <div key={index}>
                    <p>{ty}</p>
                    <button
                    
                      onClick={(e) => handleDelete(ty, e)}
                    >
                      x
                    </button>
                  </div>
                ))}
                
        </div>

        <button className={style.buttonCrear} type= 'submit'>
            Crear Pokemon
        </button>

      </form>
      </div>

      </div>
    </div>
  );
}
