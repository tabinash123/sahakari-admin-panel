import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import { ImagePreview } from '../styles/productStyle'; // Adjust the import path as necessary

const ViewProductModal = ({ isViewModalVisible, handleCancel, viewingProduct }) => {
  return (
    <Modal title="View Product" visible={isViewModalVisible} onCancel={handleCancel} footer={null}>
      {viewingProduct && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{viewingProduct.id}</Descriptions.Item>
          <Descriptions.Item label="Product Name">{viewingProduct.name}</Descriptions.Item>
          <Descriptions.Item label="Price">${viewingProduct.price !== undefined ? viewingProduct.price.toFixed(2) : 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={viewingProduct.stockStatus === 'INSTOCK' ? 'green' : 'red'}>
              {viewingProduct.stockStatus === 'INSTOCK' ? 'In Stock' : 'Out of Stock'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Description">{viewingProduct.description}</Descriptions.Item>
          <Descriptions.Item label="Product Type">{viewingProduct.productType}</Descriptions.Item>
          <Descriptions.Item label="Image">
            <ImagePreview src={`http://192.168.1.69:8080${viewingProduct.filePath}`} alt={viewingProduct.name} />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default ViewProductModal;
