// src/YourFormComponent.js
import React, { useState } from 'react';

const YourFormComponent = () => {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
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
    const response = await fetch('http://127.0.0.1:8000/api/yourmodel/', {
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
        Field 1:
        <input type="text" name="field1" value={formData.field1} onChange={handleChange} />
      </label>
      <br />
      <label>
        Field 2:
        <textarea name="field2" value={formData.field2} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default YourFormComponent;
