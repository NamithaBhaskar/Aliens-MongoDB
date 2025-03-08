import React from 'react';
import { useState } from 'react';
import './App.css'
import { LandingPage } from './pages/LandingPage';
import { ResultsPage } from './pages/ResultsPage';
import DetailsPage from './pages/DetailsPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { apiUrl } from './utils/constants';

function App() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [currentAlien, setCurrentAlien] = useState();
  const [aliens, setAliens] = useState([])
  const [searchType, setSearchType] = useState("");
  const setNewInput = (event) => {
    setTextInput(event.target.value);
  }

  const setNewLocation = (event) => {
    setLocationInput(event.target.value);
  }

  const setNewCurrentAlien = (alienVal) => {
    setCurrentAlien(alienVal);
  }

  const fetchAlienWithText = async () => {
      if (textInput != ""){
          setSearchPhrase(textInput);
          setSearchType("text");
          const response = await fetch(`${apiUrl}/searchSighting?param=${textInput}`);
          const result = await response.json();
          setAliens(result);
          navigate("/search-results");
      }
      else {
        alert("Enter Some text!");
      }
  }

  const fetchAlienWithLocation = async () => {
    if (locationInput.split(",").length >= 2){
        setSearchPhrase(locationInput);
        setSearchType("location");
        const city = locationInput.split(",")[0].trim();
        const state = locationInput.split(",")[1].trim();
        try {
          const response = await fetch(`${apiUrl}/searchSightingLocation?city=${city}&state=${state}`);
          const result = await response.json();
          setAliens(result);
          console.log(locationInput);
          navigate("/search-results");
        } catch(error) {
          console.log(error);
        }
    } else {
      alert("Enter \"CITY NAME, STATE NAME\"");
    }
}

  return <div id="main_container">
      <Routes>
        <Route exact 
          path='/' 
          element={<LandingPage 
            inptText={textInput}
            inptLocation={locationInput}
            setNewInput={setNewInput} 
            fetchAlien={fetchAlienWithText} 
            setNewLocation={setNewLocation}
            fetchAlienWithLocation={fetchAlienWithLocation}
          />} 
        />
        <Route exact 
          path="/search-results" 
          element={<ResultsPage 
            inptText={textInput} 
            inptLocation={locationInput}
            setNewInput={setNewInput} 
            setNewLocation={setNewLocation}
            fetchAlien={fetchAlienWithText}
            fetchAlienWithLocation={fetchAlienWithLocation}
            searchPhrase={searchPhrase} 
            aliens={aliens} 
            setNewCurrentAlien={setNewCurrentAlien}
            searchType={searchType}
          />}
        />
        <Route exact 
          path='/report-page'
          element={<DetailsPage alienData={currentAlien} />} 
        />
      </Routes>
    </div>
}

export default App
