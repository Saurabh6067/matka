import React, { useState } from 'react';
import { Button, Input, Typography, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    accountName: '',
    accountNumber: '',
    bankIFSC: '',
    bankName: '',
    upiId: ''
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Special handling for account number to track length
    if (field === 'accountNumber') {
      setAccountNumber(value);
    }
  };

  // Handle save
  const handleSave = () => {
    console.log('Saving payment details:', formData);
    // Add API call to save data
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
          Payment Details
        </Text>
      </div>

      {/* Form Content */}
      <div style={{ padding: '16px' }}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          {/* Account Name */}
          <div>
            <Text style={{ display: 'block', marginBottom: '8px', color: '#9370DB' }}>
              Account Name
            </Text>
            <Input
              placeholder="Enter account name"
              value={formData.accountName}
              onChange={(e) => handleInputChange('accountName', e.target.value)}
              style={{ 
                borderRadius: '8px', 
                padding: '12px', 
                borderColor: '#e0e0e0'
              }}
            />
          </div>

          {/* Account Number */}
          <div>
            <Text style={{ display: 'block', marginBottom: '8px', color: '#9370DB' }}>
              Account Number
            </Text>
            <div style={{ position: 'relative' }}>
              <Input
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                maxLength={16}
                style={{ 
                  borderRadius: '8px', 
                  padding: '12px', 
                  borderColor: '#e0e0e0'
                }}
              />
              <Text style={{ 
                position: 'absolute', 
                right: '12px', 
                top: '12px', 
                color: '#aaa', 
                fontSize: '12px'
              }}>
                {accountNumber.length}/16
              </Text>
            </div>
          </div>

          {/* Bank IFSC */}
          <div>
            <Text style={{ display: 'block', marginBottom: '8px', color: '#9370DB' }}>
              Bank IFSC
            </Text>
            <Input
              placeholder="Enter bank IFSC"
              value={formData.bankIFSC}
              onChange={(e) => handleInputChange('bankIFSC', e.target.value)}
              style={{ 
                borderRadius: '8px', 
                padding: '12px', 
                borderColor: '#e0e0e0'
              }}
            />
          </div>

          {/* Bank Name */}
          <div>
            <Text style={{ display: 'block', marginBottom: '8px', color: '#9370DB' }}>
              Bank Name
            </Text>
            <Input
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              style={{ 
                borderRadius: '8px', 
                padding: '12px', 
                borderColor: '#e0e0e0'
              }}
            />
          </div>

          {/* UPI ID */}
          <div>
            <Text style={{ display: 'block', marginBottom: '8px', color: '#9370DB' }}>
              UPI Id
            </Text>
            <Input
              placeholder="Enter UPI id"
              value={formData.upiId}
              onChange={(e) => handleInputChange('upiId', e.target.value)}
              style={{ 
                borderRadius: '8px', 
                padding: '12px', 
                borderColor: '#e0e0e0'
              }}
            />
          </div>

          {/* Save Button */}
          <Button
            type="primary"
            onClick={handleSave}
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
            Save Details
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default PaymentDetails;