import View from "./view.js";
import resultsPokeView from "./resultsPokeView.js";

class TypePokeView extends View {
  _parentElement = document.querySelector(".poke-list");

  _generateMarkup() {
    // arrayOfPokemon
    this._clear();

    console.log(Array.isArray(this._data));
    console.log(this._data);

    return this._data.map((el) => resultsPokeView.render(el)).join("");
  }
}

export default new TypePokeView();
