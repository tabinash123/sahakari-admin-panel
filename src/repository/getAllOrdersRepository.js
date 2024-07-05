import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.69:8080'; // Replace with your actual API base URL

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ecommerce/admin/get-all-orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
