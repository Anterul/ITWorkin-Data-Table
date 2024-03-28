import { useState } from "react";

import "./PaginationBar.scss";
import pageSelectorButton from "../../images/pageSelectorButton.svg";

function PaginationBar(props: any) {
  function pagesNumberCounter(): number {
    return props.pagesNumberCounter;
  }

  function handleSelectChange(event: any): any {
    props.setElementsToDisplay(event.target.value);
  }

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  function handeleSelectorOpen() {
    setIsSelectorOpen(!isSelectorOpen);
  }

  return (
    <div className="pagination-bar">
      <p className="pagination-bar__total-rows">
        1-2 of {pagesNumberCounter()}
      </p>
      <p className="pagination-bar__rows-note">Rows per page:</p>

      <p className="pagination-bar__rows-per-page-counter">
        {props.rowsPerPageCounter}
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
        <option className="pagination-bar__selector-option" value={20}>
          20
        </option>
      </select>

      <button
        className="pagination-bar__page-selector"
        type="button"
        onClick={handeleSelectorOpen}
      >
        <img src={pageSelectorButton} alt="selector button" />
      </button>

      <button
        className="pagination-bar__moving-button pagination-bar__moving-button_direction_back"
        type="button"
      ></button>

      <p className="agination-bar__current-page-counter">
        1 / {pagesNumberCounter()}
      </p>

      <button
        className="pagination-bar__moving-button pagination-bar__moving-button_direction_forward"
        type="button"
      ></button>
    </div>
  );
}

export default PaginationBar;
