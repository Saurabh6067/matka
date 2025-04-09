import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

// Custom icons to match the design
const JodiIcon = () => (
  <div style={{ 
    backgroundColor: '#FFA500', 
    borderRadius: '50%', 
    width: '56px', 
    height: '56px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '26px',
    fontWeight: 'bold'
  }}>
    ⚆
  </div>
);

const HarufIcon = () => (
  <div style={{ 
    backgroundColor: '#FF4081', 
    borderRadius: '50%', 
    width: '56px', 
    height: '56px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '26px'
  }}>
    $
  </div>
);

const DepositIcon = () => (
  <div style={{ 
    backgroundColor: '#4ADE80', 
    borderRadius: '50%', 
    width: '56px', 
    height: '56px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '26px'
  }}>
    ₹
  </div>
);

const WithdrawIcon = () => (
  <div style={{ 
    backgroundColor: '#FF6B6B', 
    borderRadius: '50%', 
    width: '56px', 
    height: '56px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '26px'
  }}>
    $
  </div>
);

const TimeIcon = () => (
  <div style={{ 
    backgroundColor: '#4299E1', 
    borderRadius: '50%', 
    width: '56px', 
    height: '56px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'white',
    fontSize: '26px'
  }}>
    i
  </div>
);

const Rules = () => {
  const navigate = useNavigate();
  
  const rulesData = [
    {
      title: 'Jodi Rate',
      value: '100 k 9500',
      icon: <JodiIcon />,
      color: '#FFF8E1',
      borderColor: '#FFCC80'
    },
    {
      title: 'Haruf Rate',
      value: '100 k 950',
      icon: <HarufIcon />,
      color: '#FCE4EC',
      borderColor: '#F8BBD0'
    },
    {
      title: 'Minimum Deposit',
      value: '100 Rs',
      icon: <DepositIcon />,
      color: '#E8F5E9',
      borderColor: '#A5D6A7'
    },
    {
      title: 'Minimum Withdrawal',
      value: '950 Rs',
      icon: <WithdrawIcon />,
      color: '#FFEBEE',
      borderColor: '#FFCDD2'
    },
    {
      title: 'Withdraw Time',
      value: 'Morning 6 Bje se 2 Bje Tak',
      icon: <TimeIcon />,
      color: '#E3F2FD',
      borderColor: '#90CAF9'
    }
  ];

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
          Rules
        </Text>
      </div>

      {/* Rules Content */}
      <div style={{ padding: '16px' }}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {rulesData.map((rule, index) => (
            <Card
              key={index}
              style={{ 
                background: rule.color, 
                borderRadius: '12px',
                border: `1px solid ${rule.borderColor}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
              bodyStyle={{ 
                padding: '16px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div style={{ marginRight: '16px' }}>
                {rule.icon}
              </div>
              <div>
                <Text style={{ 
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#333',
                  display: 'block'
                }}>
                  {rule.title}
                </Text>
                <Text style={{ 
                  fontSize: '16px',
                  color: '#555'
                }}>
                  {rule.value}
                </Text>
              </div>
            </Card>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default Rules;