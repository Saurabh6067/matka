import {
    AreaChartOutlined,
    HistoryOutlined,
    HomeOutlined,
    MenuOutlined,
    QuestionCircleOutlined,
    WalletOutlined
} from '@ant-design/icons';
import {
    Button,
    Col,
    Layout,
    Row,
    Space,
    Typography
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const HelpScreen = () => {
  const navigate = useNavigate();
  
  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
  
      {/* Help Content */}
      <Content style={{ padding: '16px', paddingBottom: '70px' }}>
        <div style={{ marginTop: '24px', marginBottom: '32px' }}>
          <Text style={{ fontSize: '20px', fontWeight: '500', display: 'block' }}>
            For your query, you can reach out via listed options
          </Text>
        </div>

        {/* Contact Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Button
            type="primary"
            size="large"
            style={{ 
              height: '56px', 
              background: '#5a189a', 
              borderColor: '#5a189a',
              borderRadius: '8px',
              fontSize: '18px'
            }}
          >
            WhatsApp
          </Button>
          
          <Button
            type="primary"
            size="large"
            style={{ 
              height: '56px', 
              background: '#5a189a', 
              borderColor: '#5a189a',
              borderRadius: '8px',
              fontSize: '18px'
            }}
          >
            Telegram
          </Button>
          
          <Button
            type="primary"
            size="large"
            style={{ 
              height: '56px', 
              background: '#5a189a', 
              borderColor: '#5a189a',
              borderRadius: '8px',
              fontSize: '18px'
            }}
          >
            Call
          </Button>
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
            <Space direction="vertical" size={0}  onClick={() => navigate('/help')}>
              <QuestionCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Text style={{ fontSize: '12px' }}>Help</Text>
            </Space>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default HelpScreen;