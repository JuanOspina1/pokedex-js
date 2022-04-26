import View from "./view.js";

// inherits data and render
class ResultsPokeView extends View {
  _parentElement = document.querySelector(".poke-list");

  // I need to find a way to only create a button if a second type exist
  _generateMarkup() {
    return `
      <div class="col">
            <div class="card poke-result" style="width: 18rem">
              <img src="${this._data.sprite}" class="card-img-top" alt="${
      this._data.name
    }" />
              <div class="card-body">
                <h5 class="card-title">${this._data.name}</h5>
                <p class="card-text">Pokemon Description --</p>
                <a class="btn btn-primary ${
                  this._data.type1 ? "" : "hidden"
                }">${this._data.type1}</a>
                <a class="btn btn-primary ${
                  this._data.type2 ? "" : "hidden"
                }">${this._data.type2}</a>
              </div>
            </div>
          </div>
      `;
  }
}

export default new ResultsPokeView();
