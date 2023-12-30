import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModeratorList = () => {
  const [moderators, setModerators] = useState([]);

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await axios.get('http://localhost:8000/ReadModerateurs'); // Update the URL with your API endpoint
        setModerators(response.data);
      } catch (error) {
        console.error('Error fetching moderators:', error);
      }
    };

    fetchModerators();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  return (
    <div>
      <h2>Moderators List</h2>
      <ul>
        {moderators.map((moderator) => (
          <li key={moderator.id}>
            {moderator.id}: {moderator.username} - {moderator.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModeratorList;
