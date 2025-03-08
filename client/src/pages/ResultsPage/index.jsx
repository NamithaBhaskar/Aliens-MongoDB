import React from "react";
import "./resultsPage.css";
import { AlienTile } from "../../components/AlienTile";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import { useState, useEffect } from 'react';

export const ResultsPage = ({inptText, inptLocation, setNewInput, setNewLocation, fetchAlien, fetchAlienWithLocation, searchPhrase, aliens, setNewCurrentAlien, currSearchType}) => {
    const [searchType, setSearchType] = useState(currSearchType);
    useEffect(() => {
        if (searchType == "text") {
            setNewLocation("");
        } else if (searchType == "") {
            setNewInput("");
        }
    }, [searchType])
    return <div className="results_container">
        <div className="search-container">
            <SearchBar 
                inpt={inptText} 
                setNewInput={setNewInput} 
                fetchAlien={fetchAlien}
                placeholderText="Search using Text..."/>
            <SearchBar inpt={inptLocation} setNewInput={setNewLocation} fetchAlien={fetchAlienWithLocation} placeholderText="Search using City, State..." />
        </div>
        <div className="header">
            <h2 className="results-header">Results for <span className="search_term">{searchPhrase}</span> Go Here</h2>
            {/* {page != 1 && <button className="button prev-button" name="prev" fetchMethod={searchType == "text" ? fetchAlien : fetchAlienWithLocation}>Previous</button>} */}
        </div>
        <div className="results">
            {aliens && aliens.map((alien) => {
                return <Link key={alien.report_id} to="/report-page" onClick={() => setNewCurrentAlien(alien)}><AlienTile key={alien.report_id} alienData={alien}/></Link>
            })}
        </div>
    </div>
}