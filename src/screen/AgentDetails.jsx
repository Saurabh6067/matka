import React from 'react';
import { Button, Input, Typography, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const AgentDetails = () => {
  const navigate = useNavigate();
  
  // Agent details (could come from API or context in a real app)
  const agentInfo = {
    name: 'SUSHIL',
    mobile: '9013233546'
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
          Agent Details
        </Text>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px' }}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          {/* Agent Name */}
          <div>
            <Text style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#9370DB'
            }}>
              Agent Name
            </Text>
            <Input
              value={agentInfo.name}
              disabled
              style={{ 
                borderRadius: '8px', 
                padding: '12px', 
                borderColor: '#e0e0e0',
                color: '#333',
                fontSize: '16px',
                height: '48px',
                backgroundColor: 'white'
              }}
            />
          </div>

          {/* Mobile Number */}
          <div>
            <Text style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#9370DB'
            }}>
              Mobile Number
            </Text>
            <Input
              value={agentInfo.mobile}
              disabled
              style={{ 
                borderRadius: '8px', 
                padding: '12px', 
                borderColor: '#e0e0e0',
                color: '#333',
                fontSize: '16px',
                height: '48px',
                backgroundColor: 'white'
              }}
            />
          </div>
        </Space>
      </div>
    </div>
  );
};

export default AgentDetails;