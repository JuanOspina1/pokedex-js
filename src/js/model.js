import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
// I need to include the ".js" to properly import the files. My other project included parcel and that may have automatically allowed exclusion.

export const state = {
  poke: {},
};

const createPoke = function (data) {
  const poke = data;
  console.log(poke);

  const newName = poke.name;
  const capitalName = toTitleCase(newName);
  const capitalTypeNames = toTitleCase(poke.types[0].type.name);
  console.log(capitalName);
  // Need to capitalize the name
  return {
    name: capitalName,
    sprite: poke.sprites.front_default,
    type1: capitalTypeNames,
    // Using && to short circuit if a second type does not exist and then destructuring.
    ...(poke.types[1] && { type2: poke.types[1].type.name }),
  };
};

const toTitleCase = function (str) {
  return str.replace(/\p{L}+('\p{L}+)?/gu, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  });
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
