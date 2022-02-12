const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const typeRoute = require('./type');         //importando las rutas
const pokemonRoute = require('./pokemon'); 

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemon", pokemonRoute);   //aqui expongo las rutas de pokemons
router.use("/type", typeRoute);    //aqui expongo las rutas de types


module.exports = router;
