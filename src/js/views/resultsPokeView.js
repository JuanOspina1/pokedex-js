import View from "./view.js";
import { toTitleCase } from "../helpers.js";

// inherits data and render
class ResultsPokeView extends View {
  _parentElement = document.querySelector(".poke-list");

  // I need to find a way to only create a button if a second type exist
  _generateMarkup() {
    // Divide the HTML and then return the joined markup. Dynamically create type and stats based on amount returned from the API.
    return `
      <div class="col">
            <div class="card poke-result" style="width: 18rem">
              <img src="${this._data.sprite}" class="card-img-top" alt="${
      this._data.name
    }" />
              <div class="card-body">
                <h5 class="card-title">${this._data.name}</h5>
                <p class="poke-id">
                <span class="number-prefix">#</span>
                ${this._data.id}
                </p>
                <h6 class="card-text">Base Stats:</h6>
                <ul>
                ${this._data.stats.map(this._generateMarkupStats).join("")}
                </ul>
                ${this._data.types.map(this._generateMarkupTypes).join("")}
              </div>
            </div>
          </div>
      `;
  }

  // Handles the types array
  _generateMarkupTypes(types) {
    // Capitalize the names
    const capitalType = toTitleCase(types.type.name);

    return `
    <a class="btn ${types.type.name}">${capitalType}</a>
    `;
  }

  // Handles the stats array
  // Due to formatting, maybe make a button that reveals base stats upon request
  _generateMarkupStats(stats) {
    const capitalStat = toTitleCase(stats.stat.name);
    const baseStat = stats.base_stat;

    return `
    <li class= "poke-stat">${capitalStat}: ${baseStat}</li>
    `;
  }
}

export default new ResultsPokeView();
