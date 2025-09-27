import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const { email, password } = values;
    // Hardcoded credentials with a stronger password
    if (email === 'eve.holt@reqres.in' && password === 'cityslicka') { // <-- Changed password
      localStorage.setItem('authToken', 'dummyToken'); // store token
      message.success('Login successful!');
      navigate('/dashboard');
    } else {
      message.error('Invalid email or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <div style={{ width: 350, padding: 24, background: '#fff', borderRadius: 8 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
        <Form
          layout="vertical"
          onFinish={onFinish}
        //initialValues={{ email: 'eve.holt@reqres.in', password: 'cityslicka' }}
        >
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;