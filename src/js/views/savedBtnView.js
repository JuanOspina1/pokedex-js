import View from "./view.js";

class SavedBtnView extends View {
  _parentElement = document.querySelector(".saved-btn");

  addHandlerShowAllSaved(handler) {
    this._parentElement.addEventListener("click", function () {
      handler();
    });
  }
}

export default new SavedBtnView();
