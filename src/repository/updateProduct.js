import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.69:8080'; // Replace with your actual API base URL

export const updateProduct = async (product) => {
  try {
    const formData = new FormData();
    if (product.filePath && product.filePath instanceof File) {
      formData.append('file', product.filePath);
    }

    const response = await axios.put(
      `${API_BASE_URL}/api/ecommerce/admin/update-product/${product.id}`,
      formData,
      {
        params: {
          name: String(product.name),
          price: product.price,
          productType: product.productType,
          stockStatus: product.stockStatus,
          description: product.description
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response ? error.response.data : error.message);
    throw error;
  }
};