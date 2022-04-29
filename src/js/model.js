import {
  API_URL_POKE,
  API_URL_TYPE,
  HIGHEST_POKE_ID,
  RES_PER_PAGE,
} from "./config.js";
import { getJSON, toTitleCase } from "./helpers.js";
// I need to include the ".js" to properly import the files. My other project included parcel and that may have automatically allowed exclusion.

export const state = {
  poke: {},

  // Not sure how to implement the search state properly
  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },

  pokeByType: [],
};

const createPoke = function (data) {
  const poke = data;
  // console.log(poke);

  const capitalName = toTitleCase(poke.name);
  if (poke.id > HIGHEST_POKE_ID) return;

  return {
    name: capitalName,
    sprite: poke.sprites.other.home.front_default,
    id: poke.id,
    types: poke.types,
    stats: poke.stats,
  };
};

export const loadPoke = async function (id) {
  try {
    state.search.query = id;
    const data = await getJSON(`${API_URL_POKE}${id}`);
    // console.log(data);

    state.poke = createPoke(data);
  } catch (err) {
    console.error(`${err} 🤢🤢🤢`);
    throw err;
  }
};

export const getPokeNameByType = async function (type) {
  try {
    // Receive the data based on the type
    const data = await getJSON(`${API_URL_TYPE}${type}`);

    // Receive an array of the names
    const res = data.pokemon.map((el) => el.pokemon.name);
    // console.log(res);

    return res;
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////
// Pushing each new object into an array

export const loadPokeArray = function (arr) {
  const pokeObjArr = [];

  arr.map(async (el) => {
    const data = await getJSON(`${API_URL_POKE}${el}`);
    // return if the ID is higher than the
    if (data.id > HIGHEST_POKE_ID) return;
    // create a poke for each object
    const newPoke = createPoke(data);
    pokeObjArr.push(newPoke);
  });
  // console.log(pokeObjArr);
  state.pokeByType = pokeObjArr;
};
