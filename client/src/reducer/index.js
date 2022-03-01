const initialState = {
  pokemons: [],
  allPokemons: [],
  allTypes: [],
  filter: [],
  detail: [],
}

function rootReducer (state = initialState, action){
    switch (action.type) {
        case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        filter: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        allTypes: action.payload,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      const typeFiltered =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((p) =>
              p.types.some(
                (t) => t === action.payload || t.name === action.payload
              )
            );

      return {
        ...state,
        pokemons: typeFiltered,
      };
    case "FILTER_CREATED":
      const allPokemons2 = state.allPokemons;
      let response = [];

      if (action.payload === "all") {
        response = allPokemons2;
      }

      if (action.payload === "created") {
        const created = allPokemons2.filter((p) => p.createInDb);
        if (created.length > 0) {
          response = created;
        } else {
          response = "not found";
        }
      }

      if (action.payload === "api") {
        const api = allPokemons2.filter((p) => !p.createInDb);
        response = api;
      }

      return {
        ...state,
        pokemons: response,
      };

    case "ORDER_BY_NAME":
      const allPokemons3 = state.allPokemons;
      const orderPokemonByName =
        action.payload === "abc"
          ? allPokemons3.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : allPokemons3.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        pokemons: orderPokemonByName,
      };

    case "ORDER_BY_STRANGE":
      const allPokemons4 = state.allPokemons;
      const orderPokemonByStrange =
        action.payload === "fuerza-"
          ? allPokemons4.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : allPokemons4.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: orderPokemonByStrange,
      };

    case "SEARCH_BY_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    default:
        return state;
    }
}
export default rootReducer