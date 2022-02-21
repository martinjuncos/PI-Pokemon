import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css'

export default function LandingPage() {

  return (
    <div className= {style.neon}>

      <h1 >Henry Pokemon</h1>

      <h1>Bienvenidos</h1>

      <Link to="/home">
        <button className= {style.button}>Ingresar</button>
      </Link>

    </div>
  );
}
