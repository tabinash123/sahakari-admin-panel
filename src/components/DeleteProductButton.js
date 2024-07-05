import React from 'react';
import { Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteProduct } from '../repository/deleteProduct '; // Adjust the import path as necessary

const DeleteProductButton = ({ productId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
        await deleteProduct(productId);
        
      message.success('Product deleted successfully');
      onDeleteSuccess(productId); // Trigger parent component's delete handler
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  return (
    <Button type="link" icon={<DeleteOutlined />} onClick={handleDelete} danger />
  );
};

export default DeleteProductButton;
