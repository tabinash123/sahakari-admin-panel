import React, { useState, useEffect } from 'react';
import { Table, Typography, Modal, Button, Descriptions, Tag, Tooltip, Spin, message, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { EyeOutlined, DownOutlined } from '@ant-design/icons';
import { getAllOrders } from '../repository/getAllOrdersRepository'; // Adjust the path as necessary
import { deleteOrder } from '../repository/deleteOrder'; // Adjust the path as necessary
import { updateOrderStatus } from '../repository/updateOrderStatus'; // Adjust the path as necessary

const { Title } = Typography;

const theme = {
  primaryColor: '#1a73e8',
  primaryHoverColor: '#185abc',
  lightBackgroundColor: '#f1f3f4',
  whiteColor: '#FFFFFF',
  grayColor: '#5f6368',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Roboto, sans-serif',
};

const OrdersContainer = styled.div`
  // padding: 20px 40px;
  background-color: ${theme.whiteColor};
  max-height: calc(100vh - 100px); /* Adjust based on your layout */
  overflow-y: auto;
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
  background-color: ${theme.primaryColor};
  color: #fff;
  &:hover {
    background-color: ${theme.primaryHoverColor};
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
        const sortedOrders = data
          .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
          .slice(0, 10);
        const formattedOrders = sortedOrders.map(order => ({
          id: order.id,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          quantity: order.orderDetails.reduce((sum, detail) => sum + detail.quantity, 0),
          status: order.status,
          creationDate: order.creationDate,
          orderDetails: order.orderDetails,
          customerPhone: order.customerPhone,
          customerAddress: order.customerAddress,
        }));
        setOrders(formattedOrders);
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
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
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
        <Title level={2} style={{ color: "black" }}>Recent Orders</Title>
      </Header>
      <StyledTable
        dataSource={orders}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {viewingOrder && (
        <EnhancedModal
          title="Order Details"
          visible={isDetailModalVisible}
          onCancel={handleDetailModalCancel}
          footer={null}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Customer Name">{viewingOrder.customerName}</Descriptions.Item>
            <Descriptions.Item label="Customer Email">{viewingOrder.customerEmail}</Descriptions.Item>
            <Descriptions.Item label="Customer Phone">{viewingOrder.customerPhone}</Descriptions.Item>
            <Descriptions.Item label="Customer Address">{viewingOrder.customerAddress}</Descriptions.Item>
          </Descriptions>
          <Table
            columns={[
              {
                title: 'Product Name',
                dataIndex: ['product', 'name'],
                key: 'name',
              },
              {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
              },
              {
                title: 'Price',
                dataIndex: ['product', 'price'],
                key: 'price',
                render: (price) => `$${price.toFixed(2)}`,
              },
            ]}
            dataSource={viewingOrder.orderDetails}
            pagination={false}
            rowKey={(record) => record.id}
            style={{ marginTop: '20px' }}
          />
        </EnhancedModal>
      )}
    </OrdersContainer>
  );
};

export default RecentOrders;
