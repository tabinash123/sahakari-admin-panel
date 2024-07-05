import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Button } from 'antd';
import { 
  AppstoreOutlined, 
  ShoppingOutlined, 
  ShoppingCartOutlined, 
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

const SidebarContainer = styled.div`
  width: ${({ isCollapsed }) => (isCollapsed ? '60px' : '200px')};
  height: 100vh;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  z-index: 1000;
  padding-top: 20px;
  transition: width 0.3s;

  @media (max-width: 768px) {
    width: ${({ isCollapsed }) => (isCollapsed ? '60px' : '200px')};
  }
`;

const MenuContainer = styled.div`
  overflow-y: auto;
  padding-bottom: 20px;
`;

const StyledMenu = styled(Menu)`
  background-color: #fff;
  border-right: none;

  .ant-menu-item {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 15px;

    &:hover {
      background-color: #e6f7ff !important;
      color: #1890ff !important;
    }

    &.ant-menu-item-selected {
      background-color: #bae7ff !important;
      color: #1890ff !important;
      border-right: 4px solid #1890ff;
    }
  }
`;

const ToggleButton = styled(Button)`
  && {
    position: absolute;
    top: 10px;
    right: -25px;
    width: 25px;
    height: 25px;
    padding: 0;
    border: none;
    background-color: #fff;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #e6f7ff;
    }
  }
`;

const SidebarComponent = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggle(!isCollapsed);
  };

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <ToggleButton onClick={toggleSidebar} icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
      <MenuContainer>
        <StyledMenu
          selectedKeys={[location.pathname]}
          mode="vertical"
        >
          <Menu.Item key="/dashboard" icon={<AppstoreOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/products" icon={<ShoppingOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
            <Link to="/orders">Orders</Link>
          </Menu.Item>
        </StyledMenu>
      </MenuContainer>
    </SidebarContainer>
  );
};

export default SidebarComponent;
