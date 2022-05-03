import * as model from "./model.js";
import resultsPokeView from "./views/resultsPokeView.js";
import searchView from "./views/searchView.js";
import initialView from "./views/initialView.js";
import typesPokeView from "./views/typesPokeView.js";
import { RESET_PAGE } from "./config.js";
import paginationView from "./views/paginationView.js";
import savedPokeView from "./views/savedPokeView.js";

const controlPokeSearchResults = async function () {
  try {
    // Add a spinner for searching

    // Get search value
    const result = searchView.getSearchResult();
    if (!result) return;

    // Load search result - currently only 1
    await model.loadPoke(result);
    resultsPokeView.render(model.state.poke);
    searchView._clearInput();
  } catch (err) {
    console.error(`${err}, 💥`);
  }
};

// Need to refactor the below to generate results based on the current page
const controlTypeButtonResults = async function (type) {
  try {
    // resultsPokeView.clear();

    // Return the Names from model
    const names = await model.getPokeNameByType(type);

    await model.loadPokeArray(names);
    // console.log(model.state.pokeByType);

    // Render based on the results limited by pagination for the 1st page - first 8 search results
    typesPokeView.render(model.getSearchResultsPage(RESET_PAGE));

    // Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlSavingPoke = function (selectedPokeEl) {
  // Take the selected element and send it to the model
  model.addSavedPoke(selectedPokeEl);

  // search in the model.search.results array for the obj with the matching id <- this logic would only work for poke searched by type
  // I can create an if statement that uses || to see if it matches model.poke OR || model.search.poke <- this logice would be implemented in the model
  // update the saved poke list -> need to create the update feature
};

const controlPagination = function (goToPage) {
  // Render NEW Results
  typesPokeView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlEnteringPokedex = function () {
  initialView.transitionEntrance();
};

const init = function () {
  searchView.addHandlerPokeSearch(controlPokeSearchResults);
  searchView.addHandlerSelectType(controlTypeButtonResults);
  initialView.addHandlerEnterPokedex(controlEnteringPokedex);
  paginationView.addHandlerClick(controlPagination);
  resultsPokeView.addHandlerSavePoke(controlSavingPoke);
};
init();
