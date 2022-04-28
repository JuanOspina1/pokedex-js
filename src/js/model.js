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

export const getPokeByType = async function (type) {
  try {
    const data = await getJSON(`${API_URL_TYPE}${type}`);
    console.log(data);

    const res = data.pokemon.map((el) => el.pokemon.name);
    console.log(res);

    // The below works for creating a single poke
    return res;
  } catch (err) {
    console.log(err);
  }
};
