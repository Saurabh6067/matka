import {
    AreaChartOutlined,
    HistoryOutlined,
    HomeOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
    WalletOutlined
} from '@ant-design/icons';
import {
    Button,
    Col,
    Layout,
    Row,
    Select,
    Space,
    Table,
    Typography
} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;
const { Option } = Select;

const ChartScreen = () => {
    const navigate = useNavigate();
    const [month, setMonth] = useState('April');
    const [year, setYear] = useState('2025');

    // Generate data for the table
    const generateTableData = () => {
        const data = [];
        for (let i = 1; i <= 31; i++) {
            // Only show filled data for days 1-6
            if (i <= 6) {
                data.push({
                    key: i,
                    date: i.toString().padStart(2, '0'),
                    palikaCity: i === 1 ? '53' : i === 2 ? '96' : i === 3 ? '13' : i === 4 ? '74' : i === 5 ? '75' : '02',
                    delhiBazzar: i === 1 ? '64' : i === 2 ? '07' : i === 3 ? '95' : i === 4 ? '17' : i === 5 ? '53' : '34',
                    shriGanesh: i === 1 ? '51' : i === 2 ? '41' : i === 3 ? '70' : i === 4 ? '41' : i === 5 ? '43' : '20',
                    faridabad: i === 1 ? '09' : i === 2 ? '03' : i === 3 ? '98' : i === 4 ? '82' : i === 5 ? '68' : '68',
                    ghaziabad: i === 1 ? '22' : i === 2 ? '09' : i === 3 ? '28' : i === 4 ? '81' : i === 5 ? '67' : '56',
                    gali: i === 1 ? '47' : i === 2 ? '12' : i === 3 ? '42' : i === 4 ? '05' : i === 5 ? '98' : '-',
                });
            } else {
                // Empty data for remaining days
                data.push({
                    key: i,
                    date: i.toString().padStart(2, '0'),
                    palikaCity: '-',
                    delhiBazzar: '-',
                    shriGanesh: '-',
                    faridabad: '-',
                    ghaziabad: '-',
                    gali: '-',
                });
            }
        }
        return data;
    };

    const tableData = generateTableData();

    // Define columns for the table
    const columns = [
        {
            title: 'DATE',
            dataIndex: 'date',
            key: 'date',
            width: 60,
            fixed: 'left',
            className: 'date-column',
        },
        {
            title: 'PALIKA CITY',
            dataIndex: 'palikaCity',
            key: 'palikaCity',
            width: 100,
            className: 'palika-column',
        },
        {
            title: 'DELHI BAZZAR',
            dataIndex: 'delhiBazzar',
            key: 'delhiBazzar',
            width: 100,
            className: 'delhi-column',
        },
        {
            title: 'SHRI GANESH',
            dataIndex: 'shriGanesh',
            key: 'shriGanesh',
            width: 100,
            className: 'ganesh-column',
        },
        {
            title: 'FARIDABAD',
            dataIndex: 'faridabad',
            key: 'faridabad',
            width: 100,
            className: 'faridabad-column',
        },
        {
            title: 'GHAZIABAD',
            dataIndex: 'ghaziabad',
            key: 'ghaziabad',
            width: 100,
            className: 'ghaziabad-column',
        },
        {
            title: 'GALI',
            dataIndex: 'gali',
            key: 'gali',
            width: 100,
            className: 'gali-column',
        },
    ];

    return (
        <Layout className="layout" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
       
            {/* Month and Year Selector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#f9f9f9', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                <Select
                    value={month}
                    onChange={setMonth}
                    style={{ width: '120px' }}
                    bordered={false}
                    suffixIcon={<span>▼</span>}
                >
                    <Option value="January">January</Option>
                    <Option value="February">February</Option>
                    <Option value="March">March</Option>
                    <Option value="April">April</Option>
                    <Option value="May">May</Option>
                    <Option value="June">June</Option>
                    <Option value="July">July</Option>
                    <Option value="August">August</Option>
                    <Option value="September">September</Option>
                    <Option value="October">October</Option>
                    <Option value="November">November</Option>
                    <Option value="December">December</Option>
                </Select>

                <Select
                    value={year}
                    onChange={setYear}
                    style={{ width: '100px' }}
                    bordered={false}
                    suffixIcon={<span>▼</span>}
                >
                    <Option value="2023">2023</Option>
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                </Select>

                <Button
                    type="text"
                    icon={<SearchOutlined style={{ fontSize: '20px', color: '#5a189a' }} />}
                />
            </div>

            {/* Results Table */}
            <Content style={{ padding: '0', paddingBottom: '70px' }}>
                <div style={{ overflow: 'auto' }}>
                    <Table
                        dataSource={tableData}
                        columns={columns}
                        pagination={false}
                        bordered
                        size="small"
                        scroll={{ x: 760 }}
                        rowClassName={(record, index) => {
                            return index % 2 === 0 ? 'even-row' : 'odd-row';
                        }}
                        style={{
                            '& .date-column': { background: '#f5f5f5' },
                            '& .palika-column': { background: '#fff9c4' },
                            '& .delhi-column': { background: '#ffecb3' },
                            '& .ganesh-column': { background: '#e0f2f1' },
                            '& .faridabad-column': { background: '#bbdefb' },
                            '& .ghaziabad-column': { background: '#e1bee7' },
                            '& .gali-column': { background: '#ffcdd2' },
                            '& .even-row': { background: '#f9f9f9' },
                            '& .odd-row': { background: '#ffffff' },
                        }}
                    />
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
                            <AreaChartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
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
                {/* Bottom Navigation Indicator */}
             
            </Footer>
        </Layout>
    );
};

export default ChartScreen;