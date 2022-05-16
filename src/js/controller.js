import * as model from "./model.js";
import resultsPokeView from "./views/resultsPokeView.js";
import searchView from "./views/searchView.js";
import initialView from "./views/initialView.js";
import typesPokeView from "./views/typesPokeView.js";
import { RESET_PAGE } from "./config.js";
import paginationView from "./views/paginationView.js";
import savedPokeView from "./views/savedPokeView.js";
import savedBtnView from "./views/savedBtnView.js";

const controlPokeSearchResults = async function () {
  try {
    resultsPokeView.renderSpinner();

    resultsPokeView.clear();

    const result = searchView.getSearchResult();
    if (!result) return;

    await model.loadPoke(result);

    resultsPokeView.render(model.getSearchResultsPage(RESET_PAGE));

    paginationView.render(model.state.search);
    searchView._clearInput();
  } catch (err) {
    console.error(`${err}, 💥`);
  }
};

const controlTypeButtonResults = async function (type) {
  try {
    resultsPokeView.renderSpinner();

    // Return the Names from model
    const names = await model.getPokeNameByType(type);

    await model.loadPokeArray(names);

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
  if (!model.state.saved.some((el) => el.id === +selectedPokeEl.dataset.id))
    model.addSavedPoke(selectedPokeEl);
  else model.deleteSavedPoke(selectedPokeEl);

  // Update the resultsView to change the color
  resultsPokeView.update(model.getSearchResultsPage());

  // update the Saved Poke! list
  savedPokeView.render(model.state.saved);
};

// Selected a poke from the saved list
const controlSavedListPoke = async function (id) {
  try {
    resultsPokeView.clear();

    await model.loadPoke(id);

    resultsPokeView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlSavedPokeButton = function () {
  resultsPokeView.clear();

  model.resultsSaved();

  resultsPokeView.render(model.getSearchResultsPage());

  paginationView.render(model.state.search);
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
  savedPokeView.addHandlerPickSavedPoke(controlSavedListPoke);
  savedBtnView.addHandlerShowAllSaved(controlSavedPokeButton);
};
init();
