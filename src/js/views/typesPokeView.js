import View from "./view.js";
import resultsPokeView from "./resultsPokeView.js";

class TypePokeView extends View {
  _parentElement = document.querySelector(".poke-list");

  _generateMarkup() {
    // arrayOfPokemon
    this._clear();

    // console.log(Array.isArray(this._data));
    // console.log(this._data);

    return resultsPokeView.render(this._data);
  }
}

export default new TypePokeView();
