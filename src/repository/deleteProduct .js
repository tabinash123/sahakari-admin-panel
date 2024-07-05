import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.69:8080'; // Replace with your actual API base URL

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/ecommerce/admin/delete-product/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
};
