class SearchView {
  _parentElement = document.querySelector(".search-container");

  getSearchResult() {
    const result = this._parentElement.querySelector(".poke-search").value;

    return result;
  }

  _clearInput() {
    this._parentElement.querySelector(".poke-search").value = "";
  }

  addHandlerPokeSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerSelectType(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const selection = e.target.closest(".dropdown-item");
      if (!selection) return;

      const type = selection.dataset.type;
      console.log(type);
      handler(type);
      return type;
    });
  }
}

export default new SearchView();
