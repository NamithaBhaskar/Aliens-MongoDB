import React from "react";
import "./alienTile.css";

export const AlienTile = ({alienData}) => {
    const date = new Date(alienData.date_time); 
    return <div className="alien-card">
        <h3>Title: {alienData.summary}</h3>
        <h5>Date: {date.getMonth()}/{date.getDate()}/{date.getFullYear()}</h5>
        <h5>Location: {alienData.city}, {alienData.state}</h5>
    </div>
}