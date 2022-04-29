class SearchView {
  _parentElement = document.querySelector(".search-container");
  _searchElement = document.querySelector(".search");
  _dropDownElement = document.querySelector(".type-menu");

  getSearchResult() {
    const result = this._parentElement.querySelector(".poke-search").value;
    return result;
  }

  _clearInput() {
    this._parentElement.querySelector(".poke-search").value = "";
  }

  // fixed
  addHandlerPokeSearch(handler) {
    this._searchElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  // This works
  addHandlerSelectType(handler) {
    this._dropDownElement.addEventListener("click", function (e) {
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
