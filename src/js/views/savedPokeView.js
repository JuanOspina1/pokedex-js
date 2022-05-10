import View from "./view.js";

class SavedPokeView extends View {
  _parentElement = document.querySelector(".saved-poke-menu");

  addHandlerRenderInit(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerPickSavedPoke(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();

      const selectedEl = e.target.closest(".dropdown-item");
      const selectedPoke = selectedEl.dataset.type;
      // console.log(selectedPoke);

      handler(selectedPoke);
    });
  }
  // This generate markup will fill in the saved poke list - need to work on the styling for these tabs
  _generateMarkup() {
    this._clear();
    console.log(this._data);
    return this._data.map((el) => this._generateSavedTabs(el)).join("");
  }

  _generateSavedTabs(savedEl) {
    return `<li>
    <a class="dropdown-item" data-type="${savedEl.id}"
      ><span class="icon"
        ><img src="src/icons/saved-pokeball-svg.svg"
      /></span>
      ${savedEl.name}
      <span class="number-prefix">#</span>
    ${savedEl.id}
      </a>
  </li>`;
  }
}

export default new SavedPokeView();
