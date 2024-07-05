import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Button, Modal, Space, Typography, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CustomersContainer = styled.div`
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  height: 100%;
  max-width: 1200px;
  font-family: 'Roboto', sans-serif;

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

const StyledButton = styled(Button)`
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

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
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

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Roboto', sans-serif;
  }

  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
    font-weight: bold;
  }

  .image-cell {
    text-align: center;
  }

  .image-cell img {
    max-width: 100px;
    border-radius: 8px;
  }
`;

const StyledTable = styled(Table)`
  .ant-table {
    overflow: hidden;
    border-radius: 16px;
    border: 1px solid #e0e0e0;
  }

  .ant-table-thead > tr > th {
    background-color: #f2f2f2;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #e0e0e0;
    font-family: 'Roboto', sans-serif;
    text-align: center;
  }

  .ant-table-tbody > tr > td {
    background-color: #fff;
    color: #333;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
  }

  .ant-table-tbody > tr:nth-child(odd) > td {
    background-color: #f9f9f9;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #f0f2f5;
  }

  .ant-pagination {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
`;

const Customers = () => {
  const [customers, setCustomers] = useState([
    { key: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St', image: 'https://via.placeholder.com/100' },
    { key: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', address: '456 Elm St', image: 'https://via.placeholder.com/100' },
    { key: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '456-789-0123', address: '789 Pine St', image: 'https://via.placeholder.com/100' },
    { key: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St', image: 'https://via.placeholder.com/100' },
    { key: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', address: '456 Elm St', image: 'https://via.placeholder.com/100' },
    { key: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '456-789-0123', address: '789 Pine St', image: 'https://via.placeholder.com/100' },
    { key: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St', image: 'https://via.placeholder.com/100' },
    { key: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', address: '456 Elm St', image: 'https://via.placeholder.com/100' },
    { key: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '456-789-0123', address: '789 Pine St', image: 'https://via.placeholder.com/100' },
  ]);

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [viewingCustomer, setViewingCustomer] = useState(null);

  const showViewCustomerModal = (record) => {
    setViewingCustomer(record);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img src={record.image} alt={record.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
      ),
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'View',
      key: 'view',
      render: (text, record) => (
        <Tooltip title="View Customer">
          <StyledButton type="link" icon={<EyeOutlined />} onClick={() => showViewCustomerModal(record)} />
        </Tooltip>
      ),
    },
  ];

  return (
    <CustomersContainer>
      <Header>
        <Title level={2}>Customers</Title>
      </Header>
      <StyledTable columns={columns} dataSource={customers} pagination={{ pageSize: 5 }} scroll={{ y: 400 }} />

      {viewingCustomer && (
        <StyledModal title="Customer Details" visible={isDetailModalVisible} onCancel={handleDetailModalCancel} footer={null}>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{viewingCustomer.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{viewingCustomer.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{viewingCustomer.phone}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{viewingCustomer.address}</td>
              </tr>
              <tr>
                <th>Image</th>
                <td className="image-cell"><img src={`http://192.168.1.69:8080/${viewingCustomer.image}`} alt={viewingCustomer.name} /></td>
              </tr>
            </tbody>
          </table>
        </StyledModal>
      )}
    </CustomersContainer>
  );
};

export default Customers;
