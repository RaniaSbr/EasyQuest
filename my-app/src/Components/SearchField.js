
import "../Styles/searchField.css";

function SearchField({placeholder }) {
  return (
    <div className="search-field">
      <input type="text" id="search" placeholder={placeholder} className="search-input" />
      <img className="search_img" src="./Assets/search2.svg" alt="Search Icon" />
    </div>
  );
}

export default SearchField;

