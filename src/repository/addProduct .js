import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.69:8080'; // Replace with your actual API base URL

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/ecommerce/admin/add-product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error.response ? error.response.data : error.message);
    throw error;
  }
};
