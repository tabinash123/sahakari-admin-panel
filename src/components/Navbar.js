import React from 'react';
import styled from 'styled-components';
import { BellOutlined, MoonOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Button } from 'antd';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #003366;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: fadeIn 2s ease-in-out;

  &::before {
    content: '';
    display: block;
    width: 35px;
    height: 35px;
    background-image: url('https://via.placeholder.com/35'); // Replace with your logo URL
    background-size: cover;
    margin-right: 12px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  .item {
    margin-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333;
    font-size: 16px;
    position: relative;

    @media (max-width: 768px) {
      margin-left: 10px;
      font-size: 14px;
    }

    .icon {
      font-size: 20px;

      @media (max-width: 768px) {
        font-size: 18px;
      }
    }

    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: red;
      color: white;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

const UserMenu = styled(Menu)`
  width: 160px;
  .ant-dropdown-menu-item {
    font-size: 14px;
  }
`;

const NavbarComponent = ({ userName = 'Admin' }) => {
  const menu = (
    <UserMenu>
      <Menu.Item key="1">
        <Button type="text" disabled>{userName}</Button>
      </Menu.Item>
      <Menu.Divider />
      
    </UserMenu>
  );

  return (
    <Navbar>
      <Logo>
        Admin Panel
      </Logo>
      
    </Navbar>
  );
};

export default NavbarComponent;
