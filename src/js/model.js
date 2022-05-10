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

  search: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  // This will be based on local storage
  saved: [],
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
    // isSaved: false,
  };
};

export const loadPoke = async function (id) {
  try {
    state.search.results = [];
    // Need to do validation - if number is higher than HIGHEST_POKE_ID or not a valid name
    const validatedId = id.toString().toLowerCase();
    state.search.query = validatedId;

    // Need to verify if the id or name already exist in state.poke so we do not make the call again OR we can replace it in the array to be first in line and delete the old card in the view
    const data = await getJSON(`${API_URL_POKE}${validatedId}`);
    // console.log(data);

    state.poke = createPoke(data);
    if (state.saved.some((poke) => poke.id === state.poke.id))
      state.poke.isSaved = true;
    else state.poke.isSaved = false;

    state.search.results.push(state.poke);

    // console.log(state.search.results);
  } catch (err) {
    console.error(`${err} 🤢🤢🤢`);
    throw err;
  }
};

export const getPokeNameByType = async function (type) {
  try {
    // Receive the data based on the type
    state.search.query = type;
    const data = await getJSON(`${API_URL_TYPE}${type}`);

    // Receive an array of the names
    const res = data.pokemon.map((el) => el.pokemon.name);
    // console.log(res);

    return res;
  } catch (err) {
    console.log(err);
  }
};

// The solution was to await the pokeObjArr when setting that equal to the state.search.results
export const loadPokeArray = async function (arr) {
  // Clear the previous results
  state.search.results = [];

  // Get all of the poke from the array
  const pokeObjArr = Promise.all(
    arr.map(async (el) => {
      const data = await getJSON(`${API_URL_POKE}${el}`);
      // return if the ID is higher than the HIGHEST
      if (data.id > HIGHEST_POKE_ID) return;
      // create a poke for each object
      const newPoke = createPoke(data);
      if (state.saved.some((poke) => poke.id === newPoke.id))
        newPoke.isSaved = true;
      else newPoke.isSaved = false;
      // console.log(newPoke);
      return newPoke;
    })
  );

  const resArr = await pokeObjArr;
  // Store them in the state after filtering out undefined values
  state.search.results = resArr.filter((poke) => typeof poke !== "undefined");
};

/////////////////////////////////
// Begin factoring search results and pagination

// Default value is applied unless a new page is provided when the function is called
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  // Multiply the page minus one * the results per page to create the start
  const start = (page - 1) * state.search.resultsPerPage; //0;

  // Multiply the page * the results per page to create the end
  const end = page * state.search.resultsPerPage; //9;

  // Create a shallow copy of the array
  return state.search.results.slice(start, end);
};

////////////////////////////
// Saving pokemon to the list
// Need to verify if the poke is already saved so it cannot be saved twice.
export const addSavedPoke = function (selectedPokeEl) {
  const matchingPoke = findMatchingPoke(selectedPokeEl);
  // IF MATCHING POKE EXIST IN isSaved ARRAY - RETURN
  if (state.saved.some((el) => el.id === matchingPoke.id)) return;

  // Need to mark the matching poke as isSaved = true
  matchingPoke.isSaved = true;
  // Need to push the matching poke to the saved list
  state.saved.push(matchingPoke);

  persistSaved();
};

export const deleteSavedPoke = function (selectedPokeEl) {
  const savedIndex = state.saved.findIndex(
    (el) => el.id === +selectedPokeEl.dataset.id
  );
  //Remove it from the saved array
  state.saved.splice(savedIndex, 1);

  // Find the matching poke in the results array

  console.log(selectedPokeEl);
  const matchingPoke = findMatchingPoke(selectedPokeEl);
  console.log(matchingPoke);
  // Set isSaved to false
  matchingPoke.isSaved = false;

  const resultsIndex = state.search.results.findIndex(
    (el) => el.id === +selectedPokeEl.dataset.id
  );
  // Replace the matching poke in the results array
  state.search.results.splice(resultsIndex, 1, matchingPoke);

  persistSaved();
};

export const resultsSaved = function () {
  // I need to test how this affects the results array moving forward.
  // state.search.results = state.saved;

  // Diff method - clear it , then push the saved array - THIS WORKED!
  state.search.results = [];

  state.search.results.push(...state.saved);

  console.log(state.search.results);
};

const findMatchingPoke = function (element) {
  return state.search.results.find(({ id }) => id === +element.dataset.id);
};

const persistSaved = function () {
  localStorage.setItem("saved", JSON.stringify(state.saved));
};

const init = function () {
  const storage = localStorage.getItem("saved");
  if (storage) state.saved = JSON.parse(storage);
};
init();
