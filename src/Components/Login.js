import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
        
            const response = await axios.get('http://localhost:5000/user', {
              params: {
                  username,
                  password
              }
          });

            if (response.data.message === 'Login successful') {
                navigate('/home');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error during login. Please try again later.');
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
            />
            <br />
            <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
                Login
            </button>
        </div>
    );
}

export default Login;
