import axios from 'axios';

const BASE_URL = 'http://192.168.1.69:8080'; // Updated base UR


export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/ecommerce/admin/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};