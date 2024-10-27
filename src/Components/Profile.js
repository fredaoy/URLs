import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        
        axios.get('http://localhost:5000/api/urls') 
            .then((response) => {
                setUrls(response.data);
            })
            .catch((error) => {
                console.error('Error fetching URL history:', error);
            });
    }, []);

    return (
        <div style={{ padding: '50px'}}>
          <div className="profile" style={{textAlign: 'center' }}>
            <h1>Profile</h1>
            <h3>URL Submission History</h3>
          </div>
            <ol>
                {urls.map((url, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <strong>Original URL:</strong> {url.originalUrl} <br />
                        <strong>Short URL:</strong> 
                        <a href={`http://localhost:5000/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">
                            {`http://localhost:5000/${url.shortUrl}`}
                        </a>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Profile;
