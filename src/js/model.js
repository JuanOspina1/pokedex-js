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
  console.log(poke.stats);

  // Need to return the types & stats as an array.
  return {
    name: capitalName,
    sprite: poke.sprites.front_default,
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
