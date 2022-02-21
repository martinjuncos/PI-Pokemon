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

    <div>
        <div>
          <br/>
          <Link to="/home">
            <button className= {style.button}>Volver</button>
          </Link>
          <div className={style.block}> 
          <br/>

          <h1 className= {style.neon}> {detailPokemon.name}</h1>

          <img
            src={detailPokemon.image}
            alt="imagenot fund"
            width="250"
            height="150"
          />

          <h2 className= {style.neon}> {detailPokemon.hp}</h2>

          <h3 className= {style.neon}>{detailPokemon.types?.join(' - ')}</h3>
          <br/>

          {/* {detailPokemon.types?.map((e, index) =>{
            return(
             <h3 className= {style.neon} key= {index}>{e} </h3>
            )
          })}   */}
          </div>      
            
        </div>
    </div>
  );
}
