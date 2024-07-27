// src/repository/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.69:8080', // Replace with your API base URL
});

export const getProducts = async () => {
  try {
    const response = await api.get('/api/ecommerce/open/product/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const formData = new FormData();
    formData.append('file', product.file);
    const response = await api.put(`/api/ecommerce/admin/update-product/${id}`, formData, {
      params: {
        name: product.name,
        price: product.price,
        productType: product.productType,
        description: product.description,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const formData = new FormData();
    formData.append('file', product.file);
    const response = await api.post('/api/ecommerce/admin/add-product', formData, {
      params: {
        name: product.name,
        price: product.price,
        productType: product.productType,
        description: product.description,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
