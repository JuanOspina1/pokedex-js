import View from "./view.js";
import resultsPokeView from "./resultsPokeView.js";

class TypePokeView extends View {
  _parentElement = document.querySelector(".poke-list");

  // This is not generating the cards for each poke in the array. No error message, not sure what is wrong
  _generateMarkup() {
    // arrayOfPokemon

    console.log(Array.isArray(this._data));
    console.log(this._data);

    // Each element is coming back as undefined.

    // return resultsPokeView.render(this._data);

    // This is returning an empty string
    return this._data.map((el) => resultsPokeView.render(el)).join("");
  }
}

export default new TypePokeView();