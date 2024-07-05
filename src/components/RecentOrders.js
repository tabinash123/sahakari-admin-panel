import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Modal, Button, Descriptions, Tag, Tooltip, Spin, message, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { EyeOutlined, DownOutlined } from '@ant-design/icons';
import { getAllOrders } from '../repository/getAllOrdersRepository'; // Adjust the path as necessary
import { deleteOrder } from '../repository/deleteOrder'; // Adjust the path as necessary
import { updateOrderStatus } from '../repository/updateOrderStatus'; // Adjust the path as necessary

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

const OrdersContainer = styled.div`
  padding: 40px;
  background-color: ${theme.whiteColor};
  border-radius: 16px;
  max-width: 1200px;
  overflow-y: auto;
  font-family: ${theme.fontFamily};
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const StyledTable = styled(Table)`
  .ant-table {
    border-radius: 16px;
    border: 1px solid #ddd;
  }

  .ant-table-thead > tr > th {
    background-color: ${theme.lightBackgroundColor};
    font-weight: bold;
    color: ${theme.grayColor};
    border-bottom: 2px solid #e8e8e8;
    font-family: ${theme.fontFamily};
    padding: 16px;
  }

  .ant-table-tbody > tr > td {
    background-color: ${theme.whiteColor};
    color: ${theme.grayColor};
    font-family: ${theme.fontFamily};
    padding: 20px; /* Increase row height */
    border-bottom: 1px solid #ddd;
  }

  .ant-table-tbody > tr:nth-child(odd) > td {
    background-color: ${theme.whiteColor}; /* White background for even rows */
  }

  .ant-table-tbody > tr:nth-child(even) > td {
    background-color: ${theme.lightBackgroundColor}; /* Light background for odd rows */
  }

  .ant-table-wrapper {
    max-height: 400px; /* Adjust the height as needed */
  }
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #007bff;
  color: #fff;
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const EnhancedModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 20px;
    font-family: ${theme.fontFamily};
    transition: all 0.3s ease;
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

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const showViewOrderModal = (record) => {
    setViewingOrder(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      message.success('Order deleted successfully');
    } catch (error) {
      message.error('Failed to delete order');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders(orders.map(order => (order.id === orderId ? { ...order, status } : order)));
      message.success('Order status updated successfully');
    } catch (error) {
      message.error('Failed to update order status');
    }
  };

  const statusColors = {
    DELIVERED: 'green',
    ORDERED: 'orange',
  };

  const getMenu = (record) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleUpdateOrderStatus(record.id, 'DELIVERED')}>Deliver</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" onClick={() => handleDeleteOrder(record.id)} style={{ color: 'red' }}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Customer Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={statusColors[status]}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={getMenu(record)} trigger={['click']}>
          <StyledButton>
            Actions <DownOutlined />
          </StyledButton>
        </Dropdown>
      ),
    },
    {
      title: 'View',
      key: 'view',
      render: (text, record) => (
        <Tooltip title="View Order">
          <StyledButton type="link" icon={<EyeOutlined />} onClick={() => showViewOrderModal(record)} />
        </Tooltip>
      ),
    },
  ];

  if (loading) {
    return (
      <OrdersContainer>
        <Spin tip="Loading..." />
      </OrdersContainer>
    );
  }

  if (error) {
    return <OrdersContainer>Error: {error.message}</OrdersContainer>;
  }

  return (
    <OrdersContainer>
      <Header>
        <Title level={2} style={{ color: theme.primaryColor }}>Recent Orders</Title>
      </Header>
      <StyledTable
        dataSource={orders}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        // scroll={{ y: 400 }}
      />

      {viewingOrder && (
        <EnhancedModal
          title="Order Details"
          visible={isDetailModalVisible}
          onCancel={handleDetailModalCancel}
          footer={null}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Order ID">{viewingOrder.id}</Descriptions.Item>
            <Descriptions.Item label="Product ID">{viewingOrder.productId}</Descriptions.Item>
            <Descriptions.Item label="Customer Email">{viewingOrder.customerEmail}</Descriptions.Item>
            <Descriptions.Item label="Quantity">{viewingOrder.quantity}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={statusColors[viewingOrder.status]}>{viewingOrder.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Date">
              {viewingOrder.creationDate}
            </Descriptions.Item>
          </Descriptions>
        </EnhancedModal>
      )}
    </OrdersContainer>
  );
};

export default RecentOrders;
