import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const theme = {
  primaryColor: '#FF5722',
  primaryHoverColor: '#FF7043',
  backgroundColor: '#FFF3E0',
  whiteColor: '#ffffff',
  grayColor: '#333',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Roboto, sans-serif',
  lightGrayColor: '#f9f9f9',
  brownColor: '#8D6E63',
  greenColor: '#009688',
  greenHoverColor: '#26A69A',
};

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, rgb(54, 94, 50),rgb(129, 162, 99),rgb(231, 211, 127),rgb(253, 155, 99)); 
  font-family: ${theme.fontFamily};
`;

const LoginFormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: ${theme.backgroundColor};
  border-radius: 16px;
  box-shadow: ${theme.boxShadow};
  text-align: center;
  animation: ${slideIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  background-color: ${theme.greenColor};
  color: ${theme.whiteColor};
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-top: 20px;

  &:hover {
    background-color: ${theme.greenHoverColor};
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: ${theme.grayColor};
`;

const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Login successful');
      onLogin(values); // Pass login data to the parent component
    } catch (error) {
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginFormWrapper>
        <Title level={2} style={{ color: theme.brownColor }}>
          Admin Login
        </Title>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: theme.grayColor }} />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: theme.grayColor }} />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <StyledButton type="primary" htmlType="submit" loading={loading}>
              Log in
            </StyledButton>
          </Form.Item>
        </Form>
        <Footer>© 2024 Grocery E-commerce. All rights reserved.</Footer>
      </LoginFormWrapper>
    </LoginContainer>
  );
};

export default LoginPage;
