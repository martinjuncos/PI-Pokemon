const { Router } = require('express');
const {Type} = require ('../db')
const {getTypes} = require ('../controllers/typeController');

const router = Router();

router.get("/", async (req, res, next) => {
    let types = await getTypes();
    res.status(200).send(types);
    console.log('tipos', types)
  });

module.exports = router;