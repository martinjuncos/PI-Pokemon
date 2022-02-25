import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css'

export default function LandingPage() {

  return (
    <div className= {style.landing}>

      <h1 className= {style.titulo}>Henry Pokemon</h1>

      <h2 className= {style.subtitulo} >Bienvenidos</h2>

      <Link to="/home">
        <button className= {style.buttonLanding}>Ingresar</button>
      </Link>

    </div>
  );
}
