export default class View {
  _data;

  render(data) {
    // Data we are taking in becomes the data that is inherited.
    this._data = data;

    // Generate the markup for each view
    const markup = this._generateMarkup();

    // Each view has its corresponding parent element
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
