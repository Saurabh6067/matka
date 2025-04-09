import {
  AreaChartOutlined,
  DollarOutlined,
  HistoryOutlined,
  HomeOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  SwapOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { Card, Col, Layout, Row, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;

const WalletScreen = () => {
  const navigate = useNavigate();

  // Mock transaction data
  const transactions = [
    { id: 1, type: 'Deposit', amount: 1, date: '02 Apr 2025 06:26 PM', closing: 49474 },
    { id: 2, type: 'Deposit', amount: 3, date: '01 Apr 2025 03:33 PM', closing: 49473 },
    { id: 3, type: 'Deposit', amount: 2, date: '01 Apr 2025 03:32 PM', closing: 49470 },
    { id: 4, type: 'Deposit', amount: 1, date: '01 Apr 2025 03:31 PM', closing: 49468 }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>


      <Content style={{ padding: '16px', paddingBottom: '70px' }}>
        {/* Total Balance Card */}
        <Card
          style={{
            marginBottom: '16px',
            borderRadius: '12px',
            textAlign: 'center'
          }}
        >
          <Title level={4} style={{ margin: 0, fontWeight: 'normal' }}>Total Balance ₹ 96649.0</Title>
        </Card>

        {/* Balance Cards */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col span={12}>
            <Card
              style={{
                background: '#5a189a',
                color: 'white',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              <Text style={{ color: 'white', display: 'block', fontSize: '16px' }}>Deposit</Text>
              <Text style={{ color: 'white', display: 'block', fontSize: '20px', fontWeight: 'bold' }}>₹ 49474</Text>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              style={{
                background: '#5a189a',
                color: 'white',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              <Text style={{ color: 'white', display: 'block', fontSize: '16px' }}>Winning</Text>
              <Text style={{ color: 'white', display: 'block', fontSize: '20px', fontWeight: 'bold' }}>₹ 47175</Text>
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col span={8}>
            <div onClick={() => navigate('/add-cash')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                background: 'white',
                borderRadius: '50%',
                cursor: 'pointer',
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <WalletOutlined style={{ color: '#5a189a', fontSize: '24px' }} />
              </div>
              <Text>Add Money</Text>
            </div>
          </Col>
          <Col span={8}>
            <div onClick={() => navigate('/withdrawal')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                background: 'white',
                borderRadius: '50%',
                cursor: 'pointer',
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <DollarOutlined style={{ color: '#5a189a', fontSize: '24px' }} />
              </div>
              <Text>Withdraw</Text>
            </div>
          </Col>
          <Col span={8}>
            <div onClick={() => navigate('/convert-winning')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                background: 'white',
                borderRadius: '50%',
                width: '60px',
                cursor: 'pointer',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <SwapOutlined style={{ color: '#5a189a', fontSize: '24px' }} />
              </div>
              <Text>Convert</Text>
            </div>
          </Col>
        </Row>

        {/* Transaction History */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ marginBottom: '16px' }}>Transaction History</Title>

          {transactions.map(transaction => (
            <Card
              key={transaction.id}
              style={{ marginBottom: '16px', borderRadius: '8px', padding: 0 }}
              bodyStyle={{ padding: 0 }}
            >
              <div style={{ padding: '16px' }}>
                <Row align="middle" justify="space-between">
                  <Col>
                    <Text strong>{transaction.type}</Text>
                  </Col>
                  <Col>
                    <Text style={{ color: 'green' }}>+ ₹{transaction.amount}</Text>
                  </Col>
                </Row>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: '#5a189a',
                padding: '8px 16px',
                color: 'white',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px'
              }}>
                <Text style={{ color: 'white' }}>{transaction.date}</Text>
                <Text style={{ color: 'white' }}>Closing: ₹ {transaction.closing}</Text>
              </div>
            </Card>
          ))}
        </div>
      </Content>

      {/* Navigation Footer */}
      <Footer
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          padding: '8px 0',
          background: 'white',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
          zIndex: 10
        }}
      >
        <Row justify="space-around" align="middle">
          <Col style={{ textAlign: 'center' }}>
            <Space direction="vertical" size={0} onClick={() => navigate('/home')}>
              <HomeOutlined style={{ fontSize: '24px' }} />
              <Text style={{ fontSize: '12px' }}>Home</Text>
            </Space>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Space direction="vertical" size={0} onClick={() => navigate('/wallet')}>
              <WalletOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Text style={{ fontSize: '12px' }}>Wallet</Text>
            </Space>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Space direction="vertical" size={0} onClick={() => navigate('/history')}>
              <HistoryOutlined style={{ fontSize: '24px' }} />
              <Text style={{ fontSize: '12px' }}>History</Text>
            </Space>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Space direction="vertical" size={0} onClick={() => navigate('/chart')}>
              <AreaChartOutlined style={{ fontSize: '24px' }} />
              <Text style={{ fontSize: '12px' }}>Chart</Text>
            </Space>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Space direction="vertical" size={0} onClick={() => navigate('/help')}>
              <QuestionCircleOutlined style={{ fontSize: '24px' }} />
              <Text style={{ fontSize: '12px' }}>Help</Text>
            </Space>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default WalletScreen;