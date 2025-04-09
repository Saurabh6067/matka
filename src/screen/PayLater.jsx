import React, { useState } from 'react';
import { Button, Typography, Space, Row, Col, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text, Paragraph } = Typography;

const PayLater = () => {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(null);
  
  // Handle amount selection
  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };
  
  // Handle apply for pay later
  const handleApply = (amount) => {
    console.log('Applying for Pay Later amount:', amount);
    // Add API call to process application
    // Then show success or next steps
  };
  
  // Handle verification
  const handleVerify = (type) => {
    console.log('Verifying:', type);
    // Navigate to verification page or open modal
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
          Pay Later
        </Text>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px' }}>
        <Space direction="vertical" size={32} style={{ width: '100%' }}>
          {/* Terms and Conditions Note */}
          <div>
            <Text style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#333',
              display: 'block',
              marginBottom: '8px'
            }}>
              Note :
            </Text>
            <Paragraph style={{ 
              color: '#666',
              fontSize: '15px',
              lineHeight: '1.5',
              margin: 0
            }}>
              By applying for Pay Later, the approved amount will be added to your wallet. This amount will be automatically deducted from your winnings or deposits once sufficient funds are available. By proceeding with Pay Later, you acknowledge and accept the associated terms and conditions.
            </Paragraph>
          </div>

          {/* Amount Options */}
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card 
                style={{ 
                  borderRadius: '8px',
                  border: selectedAmount === 500 ? '2px solid #5a189a' : '1px solid #d9d9d9',
                  textAlign: 'center',
                  padding: '8px',
                  cursor: 'pointer'
                }}
                bodyStyle={{ padding: '12px 8px' }}
                onClick={() => handleAmountSelect(500)}
              >
                <Text style={{ 
                  display: 'block', 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '12px'
                }}>
                  ₹500
                </Text>
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(500);
                  }}
                  style={{
                    background: selectedAmount === 500 ? '#5a189a' : '#aaa',
                    height: '36px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    border: 'none',
                    width: '100%'
                  }}
                >
                  Apply
                </Button>
              </Card>
            </Col>
            
            <Col span={8}>
              <Card 
                style={{ 
                  borderRadius: '8px',
                  border: selectedAmount === 1000 ? '2px solid #5a189a' : '1px solid #d9d9d9',
                  textAlign: 'center',
                  padding: '8px',
                  cursor: 'pointer'
                }}
                bodyStyle={{ padding: '12px 8px' }}
                onClick={() => handleAmountSelect(1000)}
              >
                <Text style={{ 
                  display: 'block', 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '12px'
                }}>
                  ₹1000
                </Text>
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(1000);
                  }}
                  style={{
                    background: selectedAmount === 1000 ? '#5a189a' : '#aaa',
                    height: '36px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    border: 'none',
                    width: '100%'
                  }}
                >
                  Apply
                </Button>
              </Card>
            </Col>
            
            <Col span={8}>
              <Card 
                style={{ 
                  borderRadius: '8px',
                  border: selectedAmount === 1500 ? '2px solid #5a189a' : '1px solid #d9d9d9',
                  textAlign: 'center',
                  padding: '8px',
                  cursor: 'pointer'
                }}
                bodyStyle={{ padding: '12px 8px' }}
                onClick={() => handleAmountSelect(1500)}
              >
                <Text style={{ 
                  display: 'block', 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '12px'
                }}>
                  ₹1500
                </Text>
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(1500);
                  }}
                  style={{
                    background: selectedAmount === 1500 ? '#5a189a' : '#aaa',
                    height: '36px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    border: 'none',
                    width: '100%'
                  }}
                >
                  Apply
                </Button>
              </Card>
            </Col>
          </Row>

          {/* Verification Buttons */}
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Button
              type="primary"
              onClick={() => handleVerify('aadhar')}
              style={{
                background: '#5a189a',
                height: '48px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                width: '100%'
              }}
            >
              Verify AADHAR
            </Button>
            
            <Button
              type="primary"
              onClick={() => handleVerify('pan')}
              style={{
                background: '#5a189a',
                height: '48px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                width: '100%'
              }}
            >
              Verify PAN
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default PayLater;