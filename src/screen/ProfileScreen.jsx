import React from 'react';
import { 
  Layout, 
  Typography, 
  Input, 
  Button,
  Space
} from 'antd';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Text } = Typography;

// Profile Screen Component - for use in your existing structure
const ProfileScreen = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Custom header for Profile screen */}
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
          onClick={handleBack}
          style={{ background: 'transparent', border: 'none', padding: 0, marginRight: '16px' }}
        />
        <Text style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: 'white', 
          flex: 1, 
          textAlign: 'center',
          marginRight: '24px' // To offset the back button width
        }}>
          My Profile
        </Text>
      </div>

      {/* Profile Form */}
      <Content style={{ padding: '24px', paddingBottom: '70px' }}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          {/* Name */}
          <div>
            <Text style={{ 
              display: 'block', 
              color: '#9370DB', 
              fontSize: '16px', 
              marginBottom: '8px' 
            }}>
              Name
            </Text>
            <Input
              value="ARJUN SINGH"
              disabled
              style={{ 
                height: '48px', 
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
                color: '#666',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Mobile */}
          <div>
            <Text style={{ 
              display: 'block', 
              color: '#9370DB', 
              fontSize: '16px', 
              marginBottom: '8px' 
            }}>
              Mobile
            </Text>
            <Input
              value="9305116098"
              disabled
              style={{ 
                height: '48px', 
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
                color: '#666',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Play Balance */}
          <div>
            <Text style={{ 
              display: 'block', 
              color: '#9370DB', 
              fontSize: '16px', 
              marginBottom: '8px' 
            }}>
              Play Balance
            </Text>
            <Input
              value="49475"
              disabled
              style={{ 
                height: '48px', 
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
                color: '#666',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Winning Balance */}
          <div>
            <Text style={{ 
              display: 'block', 
              color: '#9370DB', 
              fontSize: '16px', 
              marginBottom: '8px' 
            }}>
              Winning Balance
            </Text>
            <Input
              value="47175"
              disabled
              style={{ 
                height: '48px', 
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
                color: '#666',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Agent Code */}
          <div>
            <Text style={{ 
              display: 'block', 
              color: '#9370DB', 
              fontSize: '16px', 
              marginBottom: '8px' 
            }}>
              Agent Code
            </Text>
            <Input
              value="SUSHIL@123"
              disabled
              style={{ 
                height: '48px', 
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
                color: '#666',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Agent Name */}
          <div>
            <Text style={{ 
              display: 'block', 
              color: '#9370DB', 
              fontSize: '16px', 
              marginBottom: '8px' 
            }}>
              Agent Name
            </Text>
            <Input
              value="SUSHIL"
              disabled
              style={{ 
                height: '48px', 
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
                color: '#666',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Agent Mobile */}
          <div>
            <Text style={{ 
              display: 'block', 
              color: '#9370DB', 
              fontSize: '16px', 
              marginBottom: '8px' 
            }}>
              Agent Mobile
            </Text>
            <Input
              value="9013233546"
              disabled
              style={{ 
                height: '48px', 
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
                color: '#666',
                fontSize: '16px'
              }}
            />
          </div>
        </Space>
      </Content>
    </Layout>
  );
};

export default ProfileScreen;