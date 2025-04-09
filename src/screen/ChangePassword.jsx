import React, { useState } from 'react';
import { Button, Input, Typography, Space, message } from 'antd';
import { ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Handle password change
  const handleChangePassword = () => {
    if (!oldPassword) {
      message.error('Please enter your old password');
      return;
    }
    
    if (!newPassword) {
      message.error('Please enter your new password');
      return;
    }
    
    if (newPassword.length < 6) {
      message.error('New password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Changing password:', { oldPassword, newPassword });
      // Add actual API call here
      
      setLoading(false);
      message.success('Password changed successfully');
      navigate(-1);
    }, 1000);
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: '#5a189a',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        color: 'white'
      }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined style={{ color: 'white', fontSize: '20px' }} />}
          onClick={() => navigate(-1)}
          style={{ background: 'transparent', border: 'none', padding: 0, marginRight: '16px' }}
        />
        <Text style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', margin: 0 }}>
          Change Password
        </Text>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px' }}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          {/* Old Password */}
          <div>
            <Text style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#9370DB'
            }}>
              Old Password
            </Text>
            <Input.Password
              placeholder="Please enter password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ 
                borderRadius: '8px', 
                padding: '12px', 
                borderColor: '#e0e0e0',
                background: 'white',
                height: '48px'
              }}
            />
          </div>

          {/* New Password */}
          <div>
            <Text style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#9370DB'
            }}>
              New Password
            </Text>
            <Input.Password
              placeholder="Please enter password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ 
                borderRadius: '8px', 
                padding: '12px', 
                borderColor: '#e0e0e0',
                background: 'white',
                height: '48px'
              }}
            />
          </div>

          {/* Change Password Button */}
          <Button
            type="primary"
            onClick={handleChangePassword}
            loading={loading}
            style={{
              background: '#a883dd',
              height: '48px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '24px',
              border: 'none',
              width: '100%'
            }}
          >
            Change Password
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ChangePassword;