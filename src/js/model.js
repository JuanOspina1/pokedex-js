import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
// I need to include the ".js" to properly import the files. My other project included parcel and that may have automatically allowed exclusion.

export const state = {
  poke: {},
};

const createPoke = function (data) {
  const poke = data;
  console.log(poke);

  // Need to capitalize the name
  return {
    name: poke.name,
    sprite: poke.sprites.front_default,
    type1: poke.types[0].type.name,
    // Using && to short circuit if a second type does not exist and then destructuring.
    ...(poke.types[1] && { type2: poke.types[1].type.name }),
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
