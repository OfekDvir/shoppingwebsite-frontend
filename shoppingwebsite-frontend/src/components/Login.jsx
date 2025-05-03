import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/serverApi';
import { useAuth } from '../components/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login: loginUser } = useAuth();  // שימוש בפונקציה מהקונטקסט

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);

            console.log('Login success:', user);

            // שמירה ב-context + localStorage
            loginUser(user);

            if (user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Email or password incorrect');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
