class SearchView {
  _parentElement = document.querySelector(".search");

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
}

export default new SearchView();
