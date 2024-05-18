import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../src/App.css';

 function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://192.168.1.163:8093/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                navigate('/home');
                const data = await response.json();
                localStorage.setItem("userId", data.userId);
            } else {
                
                setError(data.result);
          
            }
        } catch (error) {
            console.error('Login error:', error.message);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container10">
            <img className='img1' src='/logo.png' alt="Arzooo" />
            <h1 className='para'>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)} >
                <label>Mail Id *</label>
                <input
                    type="email"
                    className='box'
                    placeholder="Enter your Mail Id"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
                <label>Password *</label>
                <div className="password-input">
                    <input
                        type={showPassword ? "text" : "password"}
                        className='box'
                        placeholder="Enter Your Password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <FontAwesomeIcon className='fas1'
                        icon={showPassword ? faEye : faEyeSlash}
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                <button className='button10' type='submit'>Login</button>
                <div className='error-container'>
                {error && <p className="error">{error}</p>}
                </div>
                <p className="para"><a href="/forgot">Forgot Password?</a></p>
            </form>
        </div>
    );
}
export default Login;