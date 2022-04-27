import * as model from "./model.js";
import resultsPokeView from "./views/resultsPokeView.js";
import searchView from "./views/searchView.js";
import initialView from "./views/initialView.js";

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

const controlEnteringPokedex = function () {
  initialView.transitionEntrance();
};

const init = function () {
  searchView.addHandlerPokeSearch(controlPokeSearchResults);
  initialView.addHandlerEnterPokedex(controlEnteringPokedex);
};
init();
