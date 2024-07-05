import styled from 'styled-components';
import { Button, Modal, Table } from 'antd';

export const ProductsContainer = styled.div`
  padding: 20px 40px;
  background-color: #ffffff;
  border-radius: 16px;
  max-height: calc(100vh - 100px); // Adjust based on your layout
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

  &:hover {
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
    background-color: #f2f2f2;
    font-weight: bold;
    color: #333;
    border-bottom: 2px solid #f0f0f0;
  }

  .ant-table-tbody > tr > td {
    background-color: #fff;
    color: #333;
  }

  .ant-table-tbody > tr:nth-child(odd) > td {
    background-color: #f9f9f9;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #e6f7ff;
  }

  .ant-table-wrapper {
    overflow-y: auto;
    max-height: 400px; // Adjust the height as needed
  }
`;
