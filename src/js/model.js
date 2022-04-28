import { API_URL } from "./config.js";
import { getJSON, toTitleCase } from "./helpers.js";
// I need to include the ".js" to properly import the files. My other project included parcel and that may have automatically allowed exclusion.

export const state = {
  poke: {},
};

const createPoke = function (data) {
  const poke = data;
  console.log(poke);

  const capitalName = toTitleCase(poke.name);

  // Need to return the types & stats as an array.
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
    const data = await getJSON(`${API_URL}${id}`);
    // Logging the poke data from the API
    // console.log(data);
    state.poke = createPoke(data);
  } catch (err) {
    console.log(`${err} 🤢🤢🤢`);
    throw err;
  }
};

export const loadPokeByType = async function (type) {
  try {
    const data = await getJSON(`https://pokeapi.co/api/v2/type/${type}`);
    console.log(data);
    // capture poke name from data

    // For testing purposes, catch the first 5 from the array.
    const res = data.pokemon.map((el) => el.pokemon.name);
    console.log(res);

    // The below works for creating a single poke
    return res;
  } catch (err) {
    console.log(err);
  }
};
