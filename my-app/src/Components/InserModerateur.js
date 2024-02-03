import React, { useState } from 'react';
import axios from 'axios';

const ModeratorForm = () => {
    const [userData, setUserData] = useState({
        password: '',
        email: '',
        first_name: '',
        last_name: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/moderator/create/', userData);
            // Handle success or redirect
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Full Name: </label>
            <input type="text" name="username" onChange={handleChange} required />

            <label>Email: </label>
            <input type="email" name="email" onChange={handleChange} required />

            <button type="submit">Submit</button>
        </form>
    );
};

export default ModeratorForm;
