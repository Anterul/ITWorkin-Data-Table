import { useState } from "react";

import "./PaginationBar.scss";

function PaginationBar(props: any) {
  let pagesNumberCounter = props.pagesNumberCounter;

  function handleSelectChange(event: any): any {
    props.setElementsToDisplay(event.target.value);
  }

  // открытие и закрытие селектора
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  function handeleSelectorOpen() {
    setIsSelectorOpen(!isSelectorOpen);
  }

  // следующая страница
  function handleNextPage() {
    return props.loadNextPage();
  }

  return (
    <div className="pagination-bar">
      <p className="pagination-bar__total-rows">1-2 of {pagesNumberCounter}</p>

      <p className="pagination-bar__rows-per-page-counter">
        Rows per page:
        <span> {props.rowsPerPageCounter}</span>
      </p>

      <select
        className={`pagination-bar__rows-per-page-selector ${
          isSelectorOpen ? "pagination-bar_open" : ""
        }`}
        size={4}
        value={props.elementsToDisplay}
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
      ></button>

      <p className="pagination-bar__current-page-counter">
        1 / {pagesNumberCounter}
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
