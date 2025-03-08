import React from "react";
import searchIcon from '../../assets/search.png';
import "./searchBar.css";

function SearchBar({inpt, setNewInput, fetchAlien, placeholderText}) {
    return <div className={`search-bar`}>
    {/* <input className='search_input' type='text' name='text-search' placeholder={placeholderText} value={inpt} onChange={setNewInput}/>
    <button className="search_button" onClick={fetchAlien}>Search</button>
</div>

<div className="search-bar"> */}
      <div className="search_component">
        <input
          className="search_input"
          type="text"
          name="text-search"
          placeholder={placeholderText}
          value={inpt}
          onChange={setNewInput}
        />
        <button
          className="search_button"
          onClick={fetchAlien}
        >
          <img src={searchIcon} alt="" className="search_icon" />
        </button>
      </div>
    </div>
}

export default SearchBar;