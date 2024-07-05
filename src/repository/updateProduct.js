// repository/updateProduct.js
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.69:8080'; // Replace with your actual API base URL

export const updateProduct = async (product) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/ecommerce/admin/update-product/${product.id}`, product, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response ? error.response.data : error.message);
    throw error;
  }
}; 
