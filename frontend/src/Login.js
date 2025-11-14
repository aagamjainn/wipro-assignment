import React, { useState } from 'react';
import "./Login.css";

export default function Login({ onSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        setError(null);

        if (username === "admin" && password === "pass123") {
            onSuccess();
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to continue</p>

                <form onSubmit={submit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit" className="login-btn">Login</button>

                    {error && <div className="error">{error}</div>}

                    <div className="demo">
                        <small>Demo credentials: <b>admin / pass123</b></small>
                    </div>
                </form>
            </div>
        </div>
    );
}
