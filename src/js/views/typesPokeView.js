import View from "./view";

class TypePokeView extends View {
  _parentElement = document.querySelector(".poke-list");

  _generateMarkup() {
    // arrayOfPokemon

    this._data.map((el) => {
      return `
    <div class="col">
        <div class="card poke-result" style="width: 18rem">
            <img src="${el.sprite}" class="card-img-top" alt="${el.name}" />
            <div class="card-body">
                <h5 class="card-title">${el.name}</h5>
                    <p class="poke-id">
                    <span class="number-prefix">#</span>
                    ${el.id}
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
    });
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

export default new TypePokeView();
