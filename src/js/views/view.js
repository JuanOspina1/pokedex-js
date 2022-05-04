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

  // Review how this functionality works - get more familiar with DOM methods
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // convert markup string to dom
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(curElements, newElements);

    // Comparing node elements
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim() !== '');
        curEl.textContent = newEl.textContent;
      }
      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
