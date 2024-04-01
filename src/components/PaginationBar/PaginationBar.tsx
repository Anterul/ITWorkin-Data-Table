import { useState } from "react";

import "./PaginationBar.scss";

function PaginationBar({
  currentPage,
  firstOnList,
  lastOnList,
  totalAvailabeCharacters,
  elementsToDisplayOnCurrentPage,
  handleElementsPerPageChange,
  loadPreviousPage,
  loadNextPage,
  pagesNumberCounter,
}: {
  currentPage: number;
  firstOnList: number;
  lastOnList: number;
  totalAvailabeCharacters: number;
  elementsToDisplayOnCurrentPage: number;
  handleElementsPerPageChange: any;
  loadPreviousPage: any;
  loadNextPage: any;
  pagesNumberCounter: number;
}) {
  function handleSelectChange(event: any): any {
    const forcedNumber = parseInt(event.target.value, 10);
    handleElementsPerPageChange(forcedNumber);
    setTimeout(() => {
      setIsSelectorOpen(false);
    }, 100);
  }

  // открытие и закрытие селектора
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  function handeleSelectorOpen() {
    setIsSelectorOpen(!isSelectorOpen);
  }
  // предыдущая страница
  function handlePreviousPage() {
    return loadPreviousPage();
  }

  // следующая страница
  function handleNextPage() {
    return loadNextPage();
  }

  return (
    <div className="pagination-bar">
      <p className="pagination-bar__total-rows">
        {firstOnList}-{lastOnList} of {totalAvailabeCharacters}
      </p>

      <p className="pagination-bar__rows-per-page-counter">
        Rows per page:
        <span> {elementsToDisplayOnCurrentPage}</span>
      </p>

      <select
        className={`pagination-bar__rows-per-page-selector ${
          isSelectorOpen ? "pagination-bar_open" : ""
        }`}
        size={4}
        value={elementsToDisplayOnCurrentPage}
        onChange={handleSelectChange}
      >
        <option className="pagination-bar__selector-option" value={5}>
          5
        </option>
        <option className="pagination-bar__selector-option" value={10}>
          10
        </option>
        <option className="pagination-bar__selector-option" value={15}>
          15
        </option>
        <option className="pagination-bar__selector-option" value={50}>
          50
        </option>
      </select>

      <button
        className="pagination-bar__page-selector"
        type="button"
        onClick={handeleSelectorOpen}
      ></button>

      <button
        className="pagination-bar__moving-button pagination-bar__moving-button_direction_back"
        type="button"
        onClick={handlePreviousPage}
      ></button>

      <p className="pagination-bar__current-page-counter">
        {currentPage} / {pagesNumberCounter}
      </p>

      <button
        className="pagination-bar__moving-button pagination-bar__moving-button_direction_forward"
        type="button"
        onClick={handleNextPage}
      ></button>
    </div>
  );
}

export default PaginationBar;
