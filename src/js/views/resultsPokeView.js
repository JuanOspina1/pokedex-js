import View from "./view.js";
import { toTitleCase } from "../helpers.js";

// inherits data and render
class ResultsPokeView extends View {
  _parentElement = document.querySelector(".poke-list");

  // The below selects the closest chosen poke that has had the pokeball icon selected
  addHandlerSavePoke(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedPoke = e.target.closest(".saved-status");
      if (!selectedPoke) return;
      handler(selectedPoke);
    });
  }

  // Run markup through an array to utilize pagination from individual poke searches
  _generateMarkup() {
    /////////////////////////////////
    // clearing here will not allow me to grab the current state when I try to update
    // this._clear();

    return this._data.map((el) => this._generateMarkupBody(el)).join("");
  }

  _generateMarkupBody(el) {
    return `
      <div class="col">
            <div class="card poke-result" style="width: 18rem">
              <img src="${el.sprite}" class="card-img-top" alt="${el.name}" />
              <div class="card-body">
                <h5 class="card-title">${el.name}</h5>
                <p class="poke-id">
                <span class="number-prefix">#</span>
                ${el.id}

                <span class= "icon saved-status" data-id="${el.id}"><img src="${
      el.isSaved
        ? "src/icons/saved-pokeball-svg.svg"
        : "src/icons/free-pokeball-svg.svg"
    }"/> </span>

                </p>
                <h6 class="card-text">Base Stats:</h6>
                <ul>
                ${el.stats.map(this._generateMarkupStats).join("")}
                </ul>
                ${el.types.map(this._generateMarkupTypes).join("")}
                
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

  // Once each view has its own _generateMarkup, this should go in the View to extend to all classes
  clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new ResultsPokeView();
