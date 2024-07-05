import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.69:8080'; // Replace with your actual API base URL

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ecommerce/open/product/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
