class InitialView {
  _mainElement = document.querySelector(".main-body");
  _parentElement = document.querySelector(".welcome-post");
  _btnElement = document.querySelector(".enter-btn");

  addHandlerEnterPokedex(handler) {
    this._btnElement.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }

  transitionEntrance() {
    this._parentElement.classList.add("hide-pokedex");
    this._mainElement.classList.remove("hidden");
  }
}

export default new InitialView();
