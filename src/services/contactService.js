import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

export const sendContactMessage = async (data) => {
  try {
    // Simulate API call if backend is not ready
    // Remove this simulation block when connecting to real backend
    if (!process.env.REACT_APP_API_URL && !API_URL.includes('real-backend')) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: "Message sent successfully" };
    }

    const response = await axios.post(`${API_URL}/contact`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};
