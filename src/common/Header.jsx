import React, { useState } from 'react';
import {
    Layout,
    Button,
    Typography,
    Row,
    Col,
    Space,
    Drawer,
    Menu
} from 'antd';
import {
    MenuOutlined,
    WalletOutlined,
    HomeOutlined,
    HistoryOutlined,
    AreaChartOutlined,
    QuestionCircleOutlined,
    UserOutlined,
    BankOutlined,
    MoneyCollectOutlined,
    LogoutOutlined,
    KeyOutlined,
    ShareAltOutlined,
    TeamOutlined,
    FileTextOutlined,
    PhoneOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

// Common App Layout with Sidebar
const MainHeader = ({ children, activeTab }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Menu items for the sidebar
    const menuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'My Profile',
        },
        {
            key: 'payment',
            icon: <BankOutlined />,
            label: 'Payment Details',
        },
        {
            key: 'addCash',
            icon: <PlusCircleOutlined />,
            label: 'Add Cash',
        },
        {
            key: 'withdrawal',
            icon: <MoneyCollectOutlined />,
            label: 'Withdrawal',
        },
        {
            key: 'payLater',
            icon: <WalletOutlined />,
            label: 'Pay Later',
        },
        {
            key: 'changePassword',
            icon: <KeyOutlined />,
            label: 'Change Password',
        },
        {
            key: 'referEarn',
            icon: <ShareAltOutlined />,
            label: 'Refer & Earn',
        },
        {
            key: 'agentDetails',
            icon: <TeamOutlined />,
            label: 'Agent Details',
        },
        {
            key: 'faq',
            icon: <FileTextOutlined />,
            label: 'FAQ\'S',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
        },
    ];

    // Handle menu item clicks
    const handleMenuClick = (key) => {
        setSidebarOpen(false);
        // Navigate based on menu item
        if (key === 'profile') navigate('/profile');
        else if (key === 'payment') navigate('/payment');
        else if (key === 'addCash') navigate('/add-cash');
        else if (key === 'withdrawal') navigate('/withdrawal');
        else if (key === 'payLater') navigate('/pay-later');
        else if (key === 'changePassword') navigate('/change-password');
        else if (key === 'referEarn') navigate('/refer');
        else if (key === 'agentDetails') navigate('/agent');
        else if (key === 'faq') navigate('/faq');
        else if (key === 'logout') {
            // Handle logout
            console.log('Logging out...');
        }
    };

    return (
        <Layout className="layout" style={{ background: '#f5f5f5' }}>
            {/* Common Header for all screens */}
            <Header style={{
                background: '#5a189a',
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 'auto',
                lineHeight: 'normal',
                paddingTop: '12px',
                paddingBottom: '12px'
            }}>
                <Button
                    type="text"
                    icon={<MenuOutlined style={{ color: 'white', fontSize: '24px' }} />}
                    onClick={toggleSidebar}
                    style={{ background: 'transparent', border: 'none', padding: 0 }}
                />
                <div  onClick={()=> navigate('/add-cash')} style={{
                    background: 'white',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <WalletOutlined style={{ color: '#ff9800', marginRight: '8px', fontSize: '20px' }} />
                    <Text strong style={{ fontSize: '16px' }}>₹ 49475</Text>
                </div>
                <div style={{ width: '24px' }}></div>
            </Header>

            {/* Sidebar Menu */}
            <Drawer
                title={null}
                placement="left"
                closable={false}
                onClose={() => setSidebarOpen(false)}
                open={sidebarOpen}
                width={280}
                bodyStyle={{ padding: 0 }}
                headerStyle={{ display: 'none' }}
            >
                {/* Sidebar Header */}
                <div style={{
                    background: '#5a189a',
                    padding: '24px 16px',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#4a1080',
                        margin: '0 auto 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img
                            src="/api/placeholder/80/80"
                            alt="AK MATKA"
                            style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                        />
                    </div>
                    <Text style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', display: 'block' }}>
                        ARJUN SINGH
                    </Text>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
                        <PhoneOutlined style={{ marginRight: '8px', color: 'white' }} />
                        <Text style={{ color: 'white' }}>9305116098</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <WalletOutlined style={{ marginRight: '8px', color: 'white' }} />
                        <Text style={{ color: 'white' }}>₹ 49475</Text>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <Menu
                    mode="vertical"
                    style={{ borderRight: 'none' }}
                    items={menuItems.map(item => ({
                        key: item.key,
                        icon: item.icon,
                        label: <span style={{ color: '#5a189a', fontWeight: 500 }}>{item.label}</span>,
                        onClick: () => handleMenuClick(item.key),
                    }))}
                />
            </Drawer>

            {/* Page Content */}
            <Content style={{ padding: '0', }}>
                {children}
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
                            <HomeOutlined style={{ fontSize: '24px', color: activeTab === 'home' ? '#1890ff' : undefined }} />
                            <Text style={{ fontSize: '12px' }}>Home</Text>
                        </Space>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                        <Space direction="vertical" size={0} onClick={() => navigate('/wallet')}>
                            <WalletOutlined style={{ fontSize: '24px', color: activeTab === 'wallet' ? '#1890ff' : undefined }} />
                            <Text style={{ fontSize: '12px' }}>Wallet</Text>
                        </Space>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                        <Space direction="vertical" size={0} onClick={() => navigate('/history')}>
                            <HistoryOutlined style={{ fontSize: '24px', color: activeTab === 'history' ? '#1890ff' : undefined }} />
                            <Text style={{ fontSize: '12px' }}>History</Text>
                        </Space>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                        <Space direction="vertical" size={0} onClick={() => navigate('/chart')}>
                            <AreaChartOutlined style={{ fontSize: '24px', color: activeTab === 'chart' ? '#1890ff' : undefined }} />
                            <Text style={{ fontSize: '12px' }}>Chart</Text>
                        </Space>
                    </Col>
                    <Col style={{ textAlign: 'center' }}>
                        <Space direction="vertical" size={0} onClick={() => navigate('/help')}>
                            <QuestionCircleOutlined style={{ fontSize: '24px', color: activeTab === 'help' ? '#1890ff' : undefined }} />
                            <Text style={{ fontSize: '12px' }}>Help</Text>
                        </Space>
                    </Col>
                </Row>
                {/* Bottom Navigation Indicator - dynamically positioned based on active tab */}
                <div style={{
                    height: '4px',
                    width: '20%',
                    background: 'black',
                    margin: '0 auto',
                    marginTop: '4px',
                    marginLeft: activeTab === 'home' ? '0' :
                        activeTab === 'wallet' ? '20%' :
                            activeTab === 'history' ? '40%' :
                                activeTab === 'chart' ? '60%' : '80%'
                }}></div>
            </Footer>
        </Layout>
    );
};

export default MainHeader;