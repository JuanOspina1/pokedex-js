import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      // Search for parents
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._clear();

    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn btn--inline pagination-btn pagination__btn--next">
      <span>${curPage + 1}</span>
    </button>`;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn btn--inline pagination-btn pagination__btn--prev">
      <span>Page ${curPage - 1}</span>
    </button>`;
    }

    // Other page
    if (curPage < numPages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn btn--inline pagination-btn pagination__btn--prev">
        
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }" class="btn btn--inline pagination-btn pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      
    </button>`;
    }

    // Page 1, and no other pages
    return "";

    // If we select a page higher than the max - need to fix
  }
}

export default new PaginationView();
