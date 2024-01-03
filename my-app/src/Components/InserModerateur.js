// src/components/ModeratorForm.js
import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/moderateurForm.css";

const ModeratorForm = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/mod/', userData);
            // Handle success or redirect
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };

    return (
        <div className='mod-form'>
            <form onSubmit={handleSubmit}>
                <div className="form-button">
                    <input
                        type="text"
                        name="username"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-button">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* No need for manual password input */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ModeratorForm;
