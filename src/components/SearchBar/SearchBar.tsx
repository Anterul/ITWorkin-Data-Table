import "./SearchBar.scss";

function SearchBar({ handleSortByName }: { handleSortByName: any }) {
  function handleSortByNameOnClick() {
    handleSortByName();
  }
  return (
    <div className="search-bar">
      <button className="search-bar__filter-button" type="button"></button>
      <input
        className="search-bar__search-input"
        name="searchInput"
        type="search"
        placeholder="Search..."
      ></input>
      <button className="search-bar__add-customer-button">Add customer</button>
      <div className="search-bar__search-frame">
        <label className="search-bar__checkbox">
          <input type="checkbox" />
          <span className="search-bar__checkmark">{""}</span>
        </label>
        <button
          className="search-bar__sorting-by-name-button"
          type="button"
          onClick={handleSortByNameOnClick}
        >
          NAME
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
