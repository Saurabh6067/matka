import React from 'react';
import { Button, Typography, Collapse, Space, Divider } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const FAQ = () => {
  const navigate = useNavigate();
  
  // Custom expand icon for Collapse component
  const expandIcon = ({ isActive }) => 
    isActive ? (
      <MinusOutlined style={{ color: '#5a189a', fontSize: '16px' }} />
    ) : (
      <PlusOutlined style={{ color: '#5a189a', fontSize: '16px' }} />
    );

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
          FAQ'S
        </Text>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {/* General Questions */}
          <div>
            <Title level={5} style={{ color: '#5a189a', marginBottom: '12px' }}>
              General Questions
            </Title>
            <Collapse 
              bordered={false} 
              expandIcon={expandIcon}
              ghost
              style={{ background: 'white', borderRadius: '8px', padding: '0 8px' }}
            >
              <Panel 
                header={<Text strong>How do I create an account?</Text>} 
                key="1"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>To create an account, download our app and click on "Sign Up". You'll need to provide your mobile number, create a password, and complete verification. Follow the on-screen instructions to complete the registration process.</Text>
              </Panel>
              <Panel 
                header={<Text strong>How do I reset my password?</Text>} 
                key="2"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>To reset your password, go to the login screen and select "Forgot Password". Enter your registered mobile number and follow the verification process. You'll receive an OTP to verify your identity before creating a new password.</Text>
              </Panel>
              <Panel 
                header={<Text strong>How do I update my profile information?</Text>} 
                key="3"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>To update your profile, go to the "My Profile" section from the menu. You can update your name, email, and other details there. Some information may require verification after changes.</Text>
              </Panel>
            </Collapse>
          </div>

          <Divider style={{ margin: '8px 0' }} />

          {/* Wallet & Payments */}
          <div>
            <Title level={5} style={{ color: '#5a189a', marginBottom: '12px' }}>
              Wallet & Payments
            </Title>
            <Collapse 
              bordered={false} 
              expandIcon={expandIcon}
              ghost
              style={{ background: 'white', borderRadius: '8px', padding: '0 8px' }}
            >
              <Panel 
                header={<Text strong>How do I add money to my wallet?</Text>} 
                key="4"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>To add money to your wallet, go to "Wallet" and click on "Add Cash". Choose your preferred amount or enter a custom amount, then select your preferred payment method (UPI, Net Banking, Credit/Debit Card). Follow the payment instructions to complete the transaction.</Text>
              </Panel>
              <Panel 
                header={<Text strong>How long does it take for withdrawals to process?</Text>} 
                key="5"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>Withdrawals are typically processed within 24-48 hours. Once processed, it may take an additional 1-3 business days for the amount to reflect in your bank account, depending on your bank's policies.</Text>
              </Panel>
              <Panel 
                header={<Text strong>What is Pay Later and how does it work?</Text>} 
                key="6"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>Pay Later is a feature that allows eligible users to get instant credit to play. The borrowed amount will be automatically deducted from your future winnings or deposits. To use Pay Later, you need to verify your identity through Aadhar and PAN verification.</Text>
              </Panel>
              <Panel 
                header={<Text strong>What are the minimum and maximum withdrawal limits?</Text>} 
                key="7"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>The minimum withdrawal amount is ₹500, and the maximum is ₹50,000 per day. Monthly withdrawal limits may apply based on your account level and verification status.</Text>
              </Panel>
            </Collapse>
          </div>

          <Divider style={{ margin: '8px 0' }} />

          {/* Game Related */}
          <div>
            <Title level={5} style={{ color: '#5a189a', marginBottom: '12px' }}>
              Game & Betting
            </Title>
            <Collapse 
              bordered={false} 
              expandIcon={expandIcon}
              ghost
              style={{ background: 'white', borderRadius: '8px', padding: '0 8px' }}
            >
              <Panel 
                header={<Text strong>How do I check my game history?</Text>} 
                key="8"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>To check your game history, go to the "History" tab in the bottom navigation. You can view all your past games, bets, and results there. You can also filter the history by date range or game type.</Text>
              </Panel>
              <Panel 
                header={<Text strong>How are winning amounts calculated?</Text>} 
                key="9"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>Winning amounts are calculated based on the odds displayed at the time of placing your bet. The potential winnings are shown before you confirm your bet. Different game types have different payout rates and calculation methods.</Text>
              </Panel>
              <Panel 
                header={<Text strong>What charts are available and how do I use them?</Text>} 
                key="10"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>Our platform provides historical charts for all games. Access them from the "Chart" tab in the bottom navigation. These charts show past results and can be used for analysis. You can view different timeframes and specific game types to study patterns.</Text>
              </Panel>
            </Collapse>
          </div>

          <Divider style={{ margin: '8px 0' }} />

          {/* Support */}
          <div>
            <Title level={5} style={{ color: '#5a189a', marginBottom: '12px' }}>
              Support & Contact
            </Title>
            <Collapse 
              bordered={false} 
              expandIcon={expandIcon}
              ghost
              style={{ background: 'white', borderRadius: '8px', padding: '0 8px' }}
            >
              <Panel 
                header={<Text strong>How do I contact customer support?</Text>} 
                key="11"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>To contact customer support, go to the "Help" tab and select "Contact Us". You can reach our team through in-app chat, email at support@akmatka.com, or call our helpline at 1800-XXX-XXXX. Support is available from 9 AM to 9 PM daily.</Text>
              </Panel>
              <Panel 
                header={<Text strong>What is an agent and how do I contact them?</Text>} 
                key="12"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>Agents are our local representatives who can assist you with deposits, withdrawals, and general guidance. You can view your assigned agent's details in the "Agent Details" section in the menu. Contact them directly using the provided mobile number.</Text>
              </Panel>
              <Panel 
                header={<Text strong>How do I report an issue with a game or payment?</Text>} 
                key="13"
                style={{ 
                  marginBottom: '8px', 
                  background: 'white', 
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid #f0f0f0'
                }}
              >
                <Text>To report an issue, go to the "Help" section and select "Report an Issue". Choose the category that best matches your problem, provide details about the issue, and submit. Our support team will respond within 24 hours. For urgent matters, please contact customer support directly.</Text>
              </Panel>
            </Collapse>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default FAQ;