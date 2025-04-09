import {
  AreaChartOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  FileTextOutlined,
  HistoryOutlined,
  HomeOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  WalletOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Layout,
  Row,
  Space,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const GamblingApp = () => {
  const navigate = useNavigate();
  const [liveGameTimers, setLiveGameTimers] = useState({
    gali: { hours: 0, minutes: 13, seconds: 45 },
    disawar: { hours: 4, minutes: 43, seconds: 45 }
  });

  const [upcomingGameTimers, setUpcomingGameTimers] = useState({
    palikaCity: { hours: 9, minutes: 43, seconds: 45 },
    delhiBazzar: { hours: 9, minutes: 43, seconds: 45 }
  });

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveGameTimers(prev => {
        const updateTimer = (timer) => {
          let { hours, minutes, seconds } = timer;
          if (seconds > 0) {
            seconds -= 1;
          } else if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          }
          return { hours, minutes, seconds };
        };

        return {
          gali: updateTimer(prev.gali),
          disawar: updateTimer(prev.disawar)
        };
      });

      setUpcomingGameTimers(prev => {
        const updateTimer = (timer) => {
          let { hours, minutes, seconds } = timer;
          if (seconds > 0) {
            seconds -= 1;
          } else if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          }
          return { hours, minutes, seconds };
        };

        return {
          palikaCity: updateTimer(prev.palikaCity),
          delhiBazzar: updateTimer(prev.delhiBazzar)
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timer) => {
    return `${String(timer.hours).padStart(2, '0')}:${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
    

      <Content style={{ padding: '16px', paddingBottom: '70px' }}>
        {/* Banner */}
        <Card
          style={{
            background: 'linear-gradient(to right, #1a0033, #30015a)',
            color: 'white',
            marginBottom: '16px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: 'none'
          }}
          bodyStyle={{ padding: '16px' }}
        >
          <Row align="middle">
            <Col span={16}>
              <Text style={{ color: 'white', display: 'block', fontSize: '14px' }}>
                Ghar Bathe Khele Bina Kisi Tension Ke
              </Text>
              <Text style={{ color: 'white', display: 'block', fontSize: '14px' }}>
                Apne Dosto Ko Share Karo Or Ist
              </Text>
              <Text style={{ color: 'white', display: 'block', fontSize: '14px' }}>
                Add Money Par <Text style={{ color: '#ff9800' }}>1% Commission</Text>
              </Text>
              <Text style={{ color: 'white', display: 'block', fontSize: '14px' }}>
                Paye Jithna Jada Ist Deposit Hoga
              </Text>
              <Text style={{ color: 'white', display: 'block', fontSize: '14px' }}>
                Utne Amount Ka <Text style={{ color: '#ff9800' }}>1% Refer Karne</Text>
              </Text>
              <Text style={{ color: 'white', display: 'block', fontSize: '14px', marginBottom: '16px' }}>
                Walo Ko Diya Jaye Ga Bonus
              </Text>
              <Button
                style={{
                  background: '#ff9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  height: 'auto',
                  padding: '8px 16px'
                }}
              >
                Deposit 24x7
              </Button>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '100%', height: '150px' }}>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <div style={{
                    background: 'black',
                    borderRadius: '8px',
                    width: '70%',
                    height: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <CrownOutlined style={{ fontSize: '32px', color: 'gold' }} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Action Buttons */}
        <Row gutter={[8, 16]} style={{ marginBottom: '16px' }}>
          <Col span={8}>
            <Button
            onClick={() => navigate('/rules')}
              type="primary"
              block
              style={{ background: '#5a189a', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <FileTextOutlined style={{ marginRight: '4px' }} /> Rules
            </Button>
          </Col>
          <Col span={8}>
            <Button onClick={() => navigate('/withdrawal')}
              type="primary"
              block
              danger
              style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <WalletOutlined style={{ marginRight: '4px' }} /> Withdrawal
            </Button>
          </Col>
          <Col span={8}>
            <Button onClick={() => navigate('/add-cash')}
              type="primary"
              block
              style={{ background: '#5a189a', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <PlusCircleOutlined style={{ marginRight: '4px' }} /> Add Money
            </Button>
          </Col>
        </Row>

        {/* Live Games Section */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ marginBottom: '16px', fontSize: '20px' }}>LIVE GAMES</Title>

          {/* GALI Game Card */}
          <Card style={{ marginBottom: '16px', borderRadius: '8px' }}>
            <Row align="middle" justify="space-between">
              <Col>
                <Text strong style={{ fontSize: '18px', display: 'block', margin: 0 }}>GALI</Text>
                <Text type="secondary">Running</Text>
              </Col>
              <Col>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ClockCircleOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} />
                  <Text style={{ color: '#ff4d4f' }}>{formatTime(liveGameTimers.gali)} left</Text>
                </div>
              </Col>
              <Col>
                <Button
                  type="primary"
                  style={{ background: '#5a189a', borderColor: '#5a189a', display: 'flex', alignItems: 'center' }}
                >
                  <PlayCircleOutlined style={{ marginRight: '4px' }} /> Play
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: '8px' }} gutter={8}>
              <Col span={12}>
                <div style={{ background: '#5a189a', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <Text style={{ color: 'white' }}>Close Time: 23:30:00</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ background: '#5a189a', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <Text style={{ color: 'white' }}>Result Time: 23:50:00</Text>
                </div>
              </Col>
            </Row>
          </Card>

          {/* DISAWAR Game Card */}
          <Card style={{ marginBottom: '16px', borderRadius: '8px' }}>
            <Row align="middle" justify="space-between">
              <Col>
                <Text strong style={{ fontSize: '18px', display: 'block', margin: 0 }}>DISAWAR</Text>
                <Text type="secondary">Running</Text>
              </Col>
              <Col>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ClockCircleOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} />
                  <Text style={{ color: '#ff4d4f' }}>{formatTime(liveGameTimers.disawar)} left</Text>
                </div>
              </Col>
              <Col>
                <Button
                  type="primary"
                  style={{ background: '#5a189a', borderColor: '#5a189a', display: 'flex', alignItems: 'center' }}
                >
                  <PlayCircleOutlined style={{ marginRight: '4px' }} /> Play
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: '8px' }} gutter={8}>
              <Col span={12}>
                <div style={{ background: '#5a189a', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <Text style={{ color: 'white' }}>Close Time: 04:00:00</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ background: '#5a189a', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <Text style={{ color: 'white' }}>Result Time: 05:15:00</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Upcoming Games Section */}
        <div>
          <Title level={4} style={{ marginBottom: '16px', fontSize: '20px' }}>UPCOMING GAMES</Title>

          {/* PALIKA CITY Game Card */}
          <Card style={{ marginBottom: '16px', borderRadius: '8px' }}>
            <Row align="middle" justify="space-between">
              <Col>
                <Text strong style={{ fontSize: '18px', display: 'block', margin: 0 }}>PALIKA CITY</Text>
                <Text type="secondary">Starts In</Text>
              </Col>
              <Col>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ClockCircleOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} />
                  <Text style={{ color: '#ff4d4f' }}>{formatTime(upcomingGameTimers.palikaCity)}</Text>
                </div>
              </Col>
              <Col>
                <Button
                  style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0' }}
                  disabled
                >
                  <PlayCircleOutlined style={{ marginRight: '4px' }} /> Play
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: '8px' }} gutter={8}>
              <Col span={12}>
                <div style={{ background: '#5a189a', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <Text style={{ color: 'white' }}>Start Time: 09:00:00</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ background: '#5a189a', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <Text style={{ color: 'white' }}>Result Time: 13:55:00</Text>
                </div>
              </Col>
            </Row>
          </Card>

          {/* DELHI BAZZAR Game Card */}
          <Card style={{ marginBottom: '16px', borderRadius: '8px' }}>
            <Row align="middle" justify="space-between">
              <Col>
                <Text strong style={{ fontSize: '18px', display: 'block', margin: 0 }}>DELHI BAZZAR</Text>
                <Text type="secondary">Starts In</Text>
              </Col>
              <Col>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ClockCircleOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} />
                  <Text style={{ color: '#ff4d4f' }}>{formatTime(upcomingGameTimers.delhiBazzar)}</Text>
                </div>
              </Col>
              <Col>
                <Button
                  style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0' }}
                  disabled
                >
                  <PlayCircleOutlined style={{ marginRight: '4px' }} /> Play
                </Button>
              </Col>
            </Row>
            <Row style={{ marginTop: '8px' }} gutter={8}>
              <Col span={12}>
                <div style={{ background: '#5a189a', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <Text style={{ color: 'white' }}>Start Time: 09:00:00</Text>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ background: '#5a189a', color: 'white', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <Text style={{ color: 'white' }}>Result Time: 13:55:00</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </Content>

      {/* Footer Navigation */}
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
              <HomeOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
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

export default GamblingApp;