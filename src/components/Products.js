import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../repository/getAllProducts';
import styled from 'styled-components';
import { Button, Modal, Table, Space, Typography, Tag, Tooltip, message, Spin } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import AddProductModal from './AddProductModal';
import ViewProductModal from './ViewProductModal';
import EditProductModal from './EditProductModal';
import DeleteProductButton from './DeleteProductButton';

const { Title } = Typography;

const theme = {
  primaryColor: '#4A90E2',
  primaryHoverColor: '#40A9FF',
  lightBackgroundColor: '#F5F5F5',
  whiteColor: '#FFFFFF',
  grayColor: '#333',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Roboto, sans-serif',
};

export const ProductsContainer = styled.div`
  padding: 20px 40px;
  background-color: ${theme.whiteColor};
  border-radius: 16px;
  max-height: calc(100vh - 100px); /* Adjust based on your layout */
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

export const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 16px;
  margin-top: 15px;
  border: 2px solid #ddd;
`;

export const StyledButton = styled(Button)`
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  background-color: #007bff;
  color: #fff;
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 20px;
  }

  .ant-modal-header {
    border-bottom: none;
    border-radius: 16px 16px 0 0;
  }

  .ant-modal-title {
    font-weight: bold;
    font-size: 24px;
  }

  .ant-modal-body {
    padding-top: 10px;
  }

  .ant-modal-footer {
    border-top: none;
    padding: 15px 20px;
  }
`;

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: ${theme.lightBackgroundColor};
    font-weight: bold;
    color: ${theme.grayColor};
    border-bottom: 2px solid #e8e8e8;
    padding: 16px;
    font-family: ${theme.fontFamily};
    height: 60px; /* Increase header height */
  }

  .ant-table-tbody > tr > td {
    background-color: ${theme.whiteColor};
    color: ${theme.grayColor};
    padding: 20px; /* Increase row height */
    border-bottom: 1px solid #ddd;
    font-family: ${theme.fontFamily};
  }

  .ant-table-tbody > tr:nth-child(odd) > td {
    background-color: ${theme.whiteColor}; /* White background for even rows */
  }

  .ant-table-tbody > tr:nth-child(even) > td {
    background-color: ${theme.lightBackgroundColor}; /* Light background for odd rows */
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #e6f7ff; /* Light blue background for hover */
  }

  .ant-table-wrapper {
    overflow-y: auto;
    max-height: 400px; /* Adjust the height as needed */
  }
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      setError(error);
      message.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const showAddProductModal = () => setIsModalVisible(true);
  const showViewProductModal = (record) => {
    setViewingProduct(record);
    setIsViewModalVisible(true);
  };
  const showEditProductModal = (record) => {
    setEditingProduct(record);
    setIsEditModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setIsViewModalVisible(false);
  };

  const onDeleteSuccess = (deletedProductId) => {
    setProducts(products.filter(product => product.id !== deletedProductId));
    message.success('Product deleted successfully');
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <ImagePreview src={`http://192.168.1.69:8080${record.filePath}`} alt={record.name} />
          {text}
        </Space>
      ),
    },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (price) => price ? `$${price.toFixed(2)}` : 'N/A' },
    {
      title: 'Status',
      dataIndex: 'stockStatus',
      key: 'stockStatus',
      render: (status) => (
        <Tag color={status === 'INSTOCK' ? 'green' : 'red'}>{status === 'INSTOCK' ? 'In Stock' : 'Out of Stock'}</Tag>
      ),
    },
    { title: 'Product Type', dataIndex: 'productType', key: 'productType' },
    {
      title: 'View',
      key: 'view',
      render: (text, record) => (
        <Tooltip title="View Product">
          <StyledButton type="link" icon={<EyeOutlined />} onClick={() => showViewProductModal(record)} />
        </Tooltip>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <ActionButtons>
          <Tooltip title="Edit Product">
            <StyledButton type="link" icon={<EditOutlined />} onClick={() => showEditProductModal(record)} />
          </Tooltip>
          <DeleteProductButton productId={record.id} onDeleteSuccess={onDeleteSuccess} />
        </ActionButtons>
      ),
    },
  ];

  if (loading) {
    return (
      <ProductsContainer>
        <Spin size="large" />
      </ProductsContainer>
    );
  }

  if (error) {
    return <ProductsContainer>Error: {error.message}</ProductsContainer>;
  }

  return (
    <ProductsContainer>
      <Header>
        <Title level={2}>Products</Title>
        <ButtonGroup>
          <StyledButton type="primary" icon={<PlusOutlined />} onClick={showAddProductModal}>
            Add Product
          </StyledButton>
        </ButtonGroup>
      </Header>
      <StyledTable
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 10 }}
        // scroll={{ y: 400 }} // Add vertical scroll if needed
      />

      <AddProductModal isModalVisible={isModalVisible} handleCancel={handleCancel} fetchProducts={fetchProducts} />
      <EditProductModal isModalVisible={isEditModalVisible} handleCancel={handleCancel} product={editingProduct} fetchProducts={fetchProducts} />
      <ViewProductModal isViewModalVisible={isViewModalVisible} handleCancel={handleCancel} viewingProduct={viewingProduct} />
    </ProductsContainer>
  );
};

export default Products;
