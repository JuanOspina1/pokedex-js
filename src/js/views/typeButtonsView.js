class TypeButtons {
  _parentElement = document.querySelector(".type-menu");

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

export default new TypeButtons();
