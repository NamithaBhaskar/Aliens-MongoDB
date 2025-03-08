import React, { useEffect, useState } from "react";
import "./detailsPage.css";
import { apiUrl } from "../../utils/constants";



export default function DetailsPage({ alienData }) {
    const [comments, setComments] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [username, setUsername] = useState("");
    const [commentSingle, setSingleComment] = useState("");

    const submitComment = async () => {
        if (commentSingle != "") {
            try {
                const response = await fetch(`${apiUrl}/addComment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        report_id: alienData.report_id,
                        comment: commentSingle,
                        username: username || "Anonymous"
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Reset form after successful submission
                setUsername('');
                setSingleComment('');
                fetchComments();
                // Handle success response
                console.log('Comment added successfully');
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error.message);
            }
        } else {
            alert("Add some comment before posting!")
        }
    }

    const fetchComments = async () => {
        try {
            const response = await fetch(`${apiUrl}/getComments/${alienData.report_id}`, { method: "GET" });
            const data = await response.json();
            setComments(data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    const fetchImage = async () => {
        try {
            const response = await fetch(`${apiUrl}/getSightings/${alienData.report_id}`, { method: "GET" });
            const data = await response.json(); // Fetch HTML content as text
            setImageSrc(data.base64Image);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }

    useEffect(() => {
        fetchImage();
        fetchComments();
    }, [])

    return <div className="details-container">
        <h1 className="summary_title">{alienData.summary}</h1>
        <div className="summary_with_images">
            {imageSrc && (
                <div className="image-container">
                    <img src={imageSrc} className="alien_image" alt="Alien" />
                </div>
            )}
            <div className="summary_text">
                <p className="summary_text_content">Occurred date: {new Date(alienData.date_time).getMonth()}/{new Date(alienData.date_time).getDate()}/{new Date(alienData.date_time).getFullYear()}</p>
                <p className="summary_text_content">Reported date: {new Date(alienData.posted).getMonth()}/{new Date(alienData.posted).getDate()}/{new Date(alienData.posted).getFullYear()}</p>
                <p className="summary_text_content">Duration: {alienData.duration}</p>
                <p className="summary_text_content">Shape: {alienData.shape}</p>
                {alienData.characteristics && <p className="summary_text_content">Characteristics: {alienData.characteristics}</p>}
                <p className="summary_text_content">Report: {alienData.text}</p>
                <p className="summary_text_content">Location: {alienData.city}, {alienData.state}</p>
                <a href={alienData.report_link} target="_blank">See full report</a>
            </div>
        </div>
        <h2 style={{'color':"black"}}>Comments from Users</h2>
        <div className="previous_comments">
            {comments && comments.map((comment, i) => {
                return <div className="comment" key={i}>
                    <h5>User: {comment.username}</h5>
                    <p>Comment: {comment.comment}</p>
                </div>
            })}
        </div>
        <div className="comments">
            <input type="text" className="comment_input" value={username} onChange={(event) => { setUsername(event.target.value) }} name="username" placeholder="Your Name Here" />
            <input type="textarea" className="comment_input" name="comment" value={commentSingle} onChange={(event) => { setSingleComment(event.target.value) }} placeholder="Write you comment here.." />
            <button name="add-comment" onClick={submitComment} className="comment_button">Gossip About Aliens</button>
        </div>
    </div>
}