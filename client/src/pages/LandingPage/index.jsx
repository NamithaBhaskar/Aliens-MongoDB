import React from "react";
import "./landingPage.css";
import SearchBar from "../../components/SearchBar";
import logo from "../../assets/logo.png";


export const LandingPage = ({inptText, inptLocation, setNewInput, setNewLocation, fetchAlien, fetchAlienWithLocation}) => {
    return (<div className="landing-page-container">
        <img src={logo} alt="Alien Logo" className="logo" />
        <h1>Explore the unknown</h1>
        <SearchBar inpt={inptText} setNewInput={setNewInput} fetchAlien={fetchAlien} placeholderText="Search using Text..."/>
        <SearchBar inpt={inptLocation} setNewInput={setNewLocation} fetchAlien={fetchAlienWithLocation} placeholderText="Search using City, State..." />
    </div>)
}