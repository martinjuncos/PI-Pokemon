const axios = require('axios') 
const { Type } = require('../db')

const getTypes = async () => {
  try {
    const infoTypes = await axios.get('https://pokeapi.co/api/v2/type')
    const types = infoTypes.data.results

    types.forEach((e) => {
      Type.findOrCreate({
        where: {
          name: e.name,
        },
      })
    })

    const allTypes = await Type.findAll()

    return allTypes
  } catch (error) {
    return 'Error al buscar Types'
  }
}

module.exports = {
  getTypes,
}
