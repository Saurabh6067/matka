import React, { useState } from 'react';
import { Button, Input, Typography, Space, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const AddCash = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('1000');
  const currentBalance = 49475;
  
  // Handle amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 4 characters
    if (/^\d*$/.test(value) && value.length <= 4) {
      setAmount(value);
    }
  };
  
  // Handle quick select options
  const handleQuickSelect = (value) => {
    setAmount(value.toString());
  };
  
  // Handle add money
  const handleAddMoney = () => {
    console.log('Adding money:', amount);
    // Add API call to process payment
    // Then navigate back or show success
    navigate('/wallet');
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
          Add Cash
        </Text>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px' }}>
        <Space direction="vertical" size={28} style={{ width: '100%' }}>
          {/* Current Balance */}
          <div>
            <Text style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#333'
            }}>
              Current Available : ₹ {currentBalance}
            </Text>
          </div>

          {/* Amount Input */}
          <div>
            <Text style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#9370DB'
            }}>
              Amount
            </Text>
            <div style={{ position: 'relative' }}>
              <Input
                value={amount}
                onChange={handleAmountChange}
                style={{ 
                  borderRadius: '8px', 
                  padding: '12px', 
                  borderColor: '#e0e0e0',
                  fontSize: '16px'
                }}
              />
              <Text style={{ 
                position: 'absolute', 
                right: '12px', 
                top: '12px', 
                color: '#aaa', 
                fontSize: '12px'
              }}>
                {amount.length}/4
              </Text>
            </div>
          </div>

          {/* Direct Options */}
          <div>
            <Text style={{ 
              display: 'block', 
              marginBottom: '16px', 
              fontWeight: 'bold', 
              color: '#333' 
            }}>
              Direct options
            </Text>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Button
                  onClick={() => handleQuickSelect(500)}
                  style={{
                    background: '#4ade80',
                    borderColor: 'transparent',
                    borderRadius: '8px',
                    height: '40px',
                    width: '100%',
                    color: '#333',
                    fontWeight: 'bold'
                  }}
                >
                  ₹ 500
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  onClick={() => handleQuickSelect(1000)}
                  style={{
                    background: '#4ade80',
                    borderColor: 'transparent',
                    borderRadius: '8px',
                    height: '40px',
                    width: '100%',
                    color: '#333',
                    fontWeight: 'bold'
                  }}
                >
                  ₹ 1000
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  onClick={() => handleQuickSelect(2500)}
                  style={{
                    background: '#4ade80',
                    borderColor: 'transparent',
                    borderRadius: '8px',
                    height: '40px',
                    width: '100%',
                    color: '#333',
                    fontWeight: 'bold'
                  }}
                >
                  ₹ 2500
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  onClick={() => handleQuickSelect(5000)}
                  style={{
                    background: '#4ade80',
                    borderColor: 'transparent',
                    borderRadius: '8px',
                    height: '40px',
                    width: '100%',
                    color: '#333',
                    fontWeight: 'bold'
                  }}
                >
                  ₹ 5000
                </Button>
              </Col>
            </Row>
          </div>

          {/* Add Money Button */}
          <Button
            type="primary"
            onClick={handleAddMoney}
            style={{
              background: '#5a189a',
              height: '48px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginTop: '24px',
              border: 'none',
              width: '100%'
            }}
          >
            Add Money
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default AddCash;