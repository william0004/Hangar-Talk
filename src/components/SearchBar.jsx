function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by keyword ..."
      className="search-input"
    /> 
    <button className="search-button">Search</button>
    </div>
  );
}

export default SearchBar;
