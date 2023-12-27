
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';


export const fetchModerators = async () => {
  try {
    const response = await axios.get(`${BASE_URL}moderators/mods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching moderators from database:', error);
    throw error; 
  }
};
