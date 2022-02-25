import React from "react";
import style from './Detail.module.css'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions/index";

export default function Detail() {
 

  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const detailPokemon = useSelector((state) => state.detail);

  return (

    <div className= {style.container}>
        <div>
          <Link to="/home">
            <button className= {style.buttonDetail}>Volver</button>
          </Link>
          <div> 
<img
          className= {style.img}
            src={detailPokemon.image}
            alt="imagenot fund"

          />
          <h1 className= {style.name}> {detailPokemon.name}</h1>

          
          <h3>Cantidad de daño que puede recibir</h3>
          <h2 > {detailPokemon.hp}</h2>
          <h3>Atributos asociados a los ataques</h3>
          <h2 >{detailPokemon.types?.join(' - ')}</h2>


          </div>      
            
        </div>
    </div>
  );
}
