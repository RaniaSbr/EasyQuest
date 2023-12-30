// src/YourFormComponent.js
import React, { useState } from 'react';

const YourFormComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an HTTP request to your Django backend API
    const response = await fetch('http://127.0.0.1:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Handle the response as needed
    if (response.ok) {
      console.log('Data submitted successfully');
      // You can redirect or perform other actions after successful submission
    } else {
      console.error('Failed to submit data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        email:
        <textarea name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default YourFormComponent;
