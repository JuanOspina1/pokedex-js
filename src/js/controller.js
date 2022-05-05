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

    await model.loadPoke(result);

    resultsPokeView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
    searchView._clearInput();
  } catch (err) {
    console.error(`${err}, 💥`);
  }
};

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
  // Need to validate if the poke is already saved, if so, we need to remove it from the list
  model.addSavedPoke(selectedPokeEl);

  // Update the resultsView to change the color - this is working but since we are not clearing the view, they are loading on top of each other
  resultsPokeView.update(model.getSearchResultsPage());

  // update the Saved Poke! list
  savedPokeView.render(model.state.saved);
};

////////////////////////////////
// If you add another poke after page one, you are returned to page one.
const controlPagination = function (goToPage) {
  // Render NEW Results
  typesPokeView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlSavedListInit = function () {
  savedPokeView.render(model.state.saved);
};

const controlEnteringPokedex = function () {
  initialView.transitionEntrance();
};

const init = function () {
  savedPokeView.addHandlerRenderInit(controlSavedListInit);
  searchView.addHandlerPokeSearch(controlPokeSearchResults);
  searchView.addHandlerSelectType(controlTypeButtonResults);
  initialView.addHandlerEnterPokedex(controlEnteringPokedex);
  paginationView.addHandlerClick(controlPagination);
  resultsPokeView.addHandlerSavePoke(controlSavingPoke);
};
init();
