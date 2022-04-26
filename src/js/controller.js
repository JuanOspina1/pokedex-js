import * as model from "./model.js";
import resultsPokeView from "./views/resultsPokeView.js";
import searchView from "./views/searchView.js";

const controlPokeSearchResults = async function () {
  try {
    // Add a spinner for searching

    // Get search value - need to do some search validation
    const result = searchView.getSearchResult();
    if (!result) return;

    // Load search result - currently only 1
    await model.loadPoke(result);
    resultsPokeView.render(model.state.poke);
  } catch (err) {
    console.error(`${err}, 💥`);
  }
};

// controlPokeSearchResults();
const init = function () {
  searchView.addHandlerPokeSearch(controlPokeSearchResults);
};
init();
