import React from "react";
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

    <div>
        <div>
          <Link to="/home">
            <button>Volver</button>
          </Link>

          <h1> {detailPokemon.name}</h1>

          <img
            src={detailPokemon.image}
            alt="imagenot fund"
            width="250"
            height="150"
          />

          <h2> {detailPokemon.hp}</h2>

          {detailPokemon.types?.map((e, index) =>{
            return(
             <h3 key= {index}>{e} </h3>
            )
          })}        
            
        </div>
    </div>
  );
}
