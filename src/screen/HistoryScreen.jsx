import {
  AreaChartOutlined,
  HistoryOutlined,
  HomeOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { Col, Layout, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const HistoryScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('win'); // Default to win tab for demonstration

  // Mock betting history data
  const betHistory = [
    {
      id: 1,
      date: '29/03/2025',
      time: '15:33:36',
      game: 'SHRI GANESH',
      bets: 'Bets: 01(50) 02(50) 36(50)',
      totalBetAmount: 150,
      closingAmount: 49437
    },
    {
      id: 2,
      date: '29/03/2025',
      time: '13:53:36',
      game: 'PALIKA CITY',
      bets: 'Bets: 39(5) 93(5)',
      totalBetAmount: 10,
      closingAmount: 49587
    },
    {
      id: 3,
      date: '29/03/2025',
      time: '13:47:24',
      game: 'PALIKA CITY',
      bets: 'Bets: 30(10) 37(10)',
      totalBetAmount: 20,
      closingAmount: 49597
    },
    {
      id: 4,
      date: '29/03/2025',
      time: '13:47:11',
      game: 'PALIKA CITY',
      bets: 'Bets: 44(5) 66(5) 99(20)',
      totalBetAmount: 30,
      closingAmount: 49617
    },
    {
      id: 5,
      date: '29/03/2025',
      time: '13:46:48',
      game: 'PALIKA CITY',
      bets: 'Bets: 03(5) 12(5) 79(5) 81(5) 92(5)',
      totalBetAmount: 25,
      closingAmount: 49647
    },
    {
      id: 6,
      date: '29/03/2025',
      time: '13:33:38',
      game: 'PALIKA CITY',
      bets: 'Bets: 44(10) 46(10) 47(10) 48(10) 64(10) 66(10) 67(10) 68(10) 74(10) 76(10) 77(10) 78(10) 84(10) 86(10) 87(10) 88(10)',
      totalBetAmount: 160,
      closingAmount: 49672
    }
  ];

  // Mock win history data
  const winHistory = [
    {
      id: 1,
      date: '28/03/2025',
      game: 'PALIKA CITY',
      winningAmount: 475,
      closingAmount: 47175
    },
    {
      id: 2,
      date: '18/03/2025',
      game: 'DISAWAR',
      winningAmount: 44000,
      closingAmount: 46700
    },
    {
      id: 3,
      date: '18/03/2025',
      game: 'DELHI BAZZAR',
      winningAmount: 1500,
      closingAmount: 2700
    },
    {
      id: 4,
      date: '15/03/2025',
      game: 'DISAWAR',
      winningAmount: 200,
      closingAmount: 1200
    },
    {
      id: 5,
      date: '15/03/2025',
      game: 'GALI',
      winningAmount: 1000,
      closingAmount: 1000
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
    

      <Content style={{ padding: '0', paddingBottom: '70px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e8e8e8', background: 'white' }}>
          <div 
            style={{ 
              flex: 1, 
              textAlign: 'center', 
              padding: '12px', 
              fontWeight: activeTab === 'play' ? 'bold' : 'normal',
              borderBottom: activeTab === 'play' ? '2px solid #5a189a' : 'none',
              color: activeTab === 'play' ? '#5a189a' : 'inherit'
            }}
            onClick={() => setActiveTab('play')}
          >
            Play History
          </div>
          <div 
            style={{ 
              flex: 1, 
              textAlign: 'center', 
              padding: '12px',
              fontWeight: activeTab === 'win' ? 'bold' : 'normal',
              borderBottom: activeTab === 'win' ? '2px solid #5a189a' : 'none',
              color: activeTab === 'win' ? '#5a189a' : 'inherit'
            }}
            onClick={() => setActiveTab('win')}
          >
            Win History
          </div>
        </div>

        {/* Play History Tab Content */}
        {activeTab === 'play' && (
          <div>
            {betHistory.map((bet, index) => (
              <div 
                key={bet.id} 
                style={{ 
                  padding: '16px', 
                  background: index % 2 === 0 ? '#f0e6ff' : '#e8f5e9',
                  borderBottom: '1px solid #e8e8e8'
                }}
              >
                <Row>
                  <Col span={6}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text strong>{bet.date}</Text>
                      <Text>{bet.time}</Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Text strong>{bet.game}</Text>
                  </Col>
                  <Col span={12}>
                    <Text>{bet.bets}</Text>
                    <div style={{ marginTop: '8px' }}>
                      <Text>Total Bet Amount: ₹{bet.totalBetAmount}</Text>
                    </div>
                    <div>
                      <Text>Closing Amount: ₹{bet.closingAmount}</Text>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        )}

        {/* Win History Tab Content */}
        {activeTab === 'win' && (
          <div>
            {winHistory.map((win, index) => (
              <div 
                key={win.id} 
                style={{ 
                  padding: '16px', 
                  background: index % 2 === 0 ? '#f0e6ff' : '#e8f5e9',
                  borderBottom: '1px solid #e8e8e8'
                }}
              >
                <Row>
                  <Col span={6}>
                    <Text strong>{win.date}</Text>
                  </Col>
                  <Col span={6}>
                    <Text strong>{win.game}</Text>
                  </Col>
                  <Col span={12}>
                    <div>
                      <Text strong>Winning Amount: ₹{win.winningAmount}</Text>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <Text>Closing Amount: ₹{win.closingAmount}</Text>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        )}
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
              <WalletOutlined style={{ fontSize: '24px' }} />
              <Text style={{ fontSize: '12px' }}>Wallet</Text>
            </Space>
          </Col>
          <Col style={{ textAlign: 'center' }}>
            <Space direction="vertical" size={0} onClick={() => navigate('/history')}>
              <HistoryOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
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

export default HistoryScreen;