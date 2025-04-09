import React, { useState } from 'react';
import { Button, Input, Typography, Space, Row, Col, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ConvertWinning = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const winningAvailable = 47175;
  
  // Handle amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 5 characters
    if (/^\d*$/.test(value) && value.length <= 5) {
      setAmount(value);
    }
  };
  
  // Handle quick select options
  const handleQuickSelect = (value) => {
    if (value === 'all') {
      setAmount(winningAvailable.toString());
    } else {
      setAmount(value.toString());
    }
  };
  
  // Handle convert
  const handleConvert = () => {
    if (!amount || parseInt(amount) <= 0) {
      message.error('Please enter a valid amount');
      return;
    }
    
    if (parseInt(amount) > winningAvailable) {
      message.error('Amount exceeds available winning balance');
      return;
    }
    
    console.log('Converting amount:', amount);
    // Add API call to process conversion
    message.success(`₹${amount} successfully converted to your wallet`);
    // Then navigate back or show success
    setTimeout(() => {
      navigate('/wallet');
    }, 1500);
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
          Convert Winning
        </Text>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px' }}>
        <Space direction="vertical" size={28} style={{ width: '100%' }}>
          {/* Winning Available */}
          <div>
            <Text style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#333'
            }}>
              Winning Available : ₹ {winningAvailable}
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
                placeholder="Enter amount to add"
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
                {amount.length}/5
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
                  onClick={() => handleQuickSelect('all')}
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
                  All
                </Button>
              </Col>
            </Row>
          </div>

          {/* Convert Button */}
          <Button
            type="primary"
            onClick={handleConvert}
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
            Convert
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ConvertWinning;