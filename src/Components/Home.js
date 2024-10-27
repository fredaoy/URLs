import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [userId] = useState(1);
  const navigate = useNavigate();


  const handleGenerate = async () => {
      if (!originalUrl) {
          alert('Please enter a URL');
          return;
      }

      try {
          console.log('Sending request to shorten URL...');
          const response = await axios.post('http://localhost:5000/api/shorten', {
              originalUrl,
              userId
          });
          console.log('Response:', response.data);
          setShortUrl(response.data.ShortURL);
          setOriginalUrl('');
      } catch (error) {
          console.error('Error generating short URL:', error);
      }
  };


  const handleProfileClick = () => {
      navigate('/profile');
  };

  return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
          <h1>Home Page</h1>
          
          <input
              type="text"
              placeholder="Enter URL to shorten"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
          />
          <br />
          

          <button onClick={handleGenerate} style={{ padding: '10px 20px', marginTop: '10px' }}>
              Generate Short URL
          </button>


          {shortUrl && (
              <div style={{ marginTop: '20px' }}>
                  <h3>Shortened URL:</h3>
                  <a href={`http://localhost:5000/${shortUrl}`} target="_blank" rel="noopener noreferrer">
                      {`http://localhost:5000/${shortUrl}`}
                  </a>


                  <div style={{ marginTop: '20px' }}>
                      <h3>QR Code:</h3>
                      <QRCodeSVG value={`http://localhost:5000/${shortUrl}`} size={128} />
                  </div>
              </div>
          )}

          <div style={{ marginTop: '30px' }}>
              <button onClick={handleProfileClick} style={{ padding: '10px 20px' }}>
                  Profile
              </button>
          </div>
      </div>
  );
}

export default Home;
