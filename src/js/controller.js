import * as model from "./model.js";
import resultsPokeView from "./views/resultsPokeView.js";
import searchView from "./views/searchView.js";
import initialView from "./views/initialView.js";
import typesPokeView from "./views/typesPokeView.js";

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

const controlTypeButtonResults = async function (type) {
  try {
    // resultsPokeView.clear();

    // Return the Names from model
    const names = await model.getPokeNameByType(type);

    // Request and build each poke, then add them to an array in the state
    const test = await model.loadPokeArray(names);

    typesPokeView.render(test);

    ////////////////////////////////////////////////////////
    // This works but seems incorrect to do this here for MVC architecture
    /*
    names.map(async (el) => {
      await model.loadPoke(el);
      return resultsPokeView.render(model.state.poke);
    });
    */
  } catch (err) {
    console.error(err);
  }
};

const controlEnteringPokedex = function () {
  initialView.transitionEntrance();
};

const init = function () {
  searchView.addHandlerPokeSearch(controlPokeSearchResults);
  searchView.addHandlerSelectType(controlTypeButtonResults);
  initialView.addHandlerEnterPokedex(controlEnteringPokedex);
};
init();
