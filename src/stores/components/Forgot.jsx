import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../src/App.css';

 function Forgot() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://192.168.1.163:8093/admin/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                navigate('/Login');
            } else {
                const data = await response.json();
                setError(data.result);
            }
        } 
        catch (error) {
            console.error('Login error:', error.message);
            setError('Invalid email');
        }
    };

    return (
        <div className="container10">
            <img className='img1' src='/logo.png' alt="Arzooo" />
            <h1 className='para'>Forgot Password</h1>
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
                <button className='button10' type='submit'>Submit</button>
                <div className='error-container'>
                {/* {error && <p className="error">{error}</p>} */}
                </div>
            </form>
        </div>
    );
}
export default Forgot;