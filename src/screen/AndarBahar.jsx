import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Button,
  Input,
  Table,
  Typography,
  Checkbox,
  message,
  Row,
  Col,
  Space
} from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// --- Reusing Styled Components (consider moving to common files) --- 

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const StyledHeader = styled(Header)`
  background-color: #5a189a; color: white; display: flex; align-items: center;
  justify-content: center; padding: 0 16px; position: relative;
`;
const BackButton = styled(Button)`
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  color: white !important; border: none !important; background: transparent !important;
  &:hover, &:focus { background: rgba(255, 255, 255, 0.1) !important; }
`;
const HeaderTitle = styled(Text)` color: white; font-size: 18px; font-weight: 500; `;
const StyledContent = styled(Content)` padding: 16px; background: #fff; `;
const InputContainer = styled.div` margin-bottom: 20px; `;
const StyledInput = styled(Input)` border-radius: 8px; height: 40px; border: 1px solid #d9d9d9; `;
const CheckboxContainer = styled(Row)` margin-top: 15px; align-items: center; `;
const SaveButton = styled(Button)`
  background-color: #5a189a; color: white; width: 100%; height: 45px;
  font-size: 16px; border-radius: 8px; margin-top: 20px; margin-bottom: 20px;
  &:hover, &:focus { background-color: #48137a !important; color: white !important; }
`;
const StyledTable = styled(Table)`
  .ant-table-thead > tr > th { background-color: #5a189a !important; color: white !important; text-align: center; padding: 10px 8px; }
  .ant-table-tbody > tr > td { text-align: center; padding: 10px 8px; border: none; }
  .ant-table-tbody > tr:nth-child(even) > td { background-color: #f0e6ff; }
  .ant-table-tbody > tr:nth-child(odd) > td { background-color: #e9d8f5; }
  .ant-table-tbody > tr.ant-table-row:hover > td { background: #d4b8e8; }
`;
const StyledFooter = styled(Footer)`
  position: fixed; bottom: 0; left: 0; width: 100%; background-color: #5a189a;
  color: white; padding: 10px 16px; display: flex; align-items: center;
  justify-content: space-between; z-index: 10;
`;
const RefreshButton = styled(Button)`
  background-color: #28a745; color: white; border: none;
   &:hover, &:focus { background-color: #218838 !important; color: white !important; }
`;
const PlaceBetButton = styled(Button)`
  background-color: #5a189a; border: 1px solid white; color: white;
   &:hover, &:focus { background-color: #48137a !important; color: white !important; }
`;
const TotalBetText = styled(Text)` color: white; font-weight: bold; `;

// --- Component Logic --- 

const AndarBahar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentGameName = location.state?.gameName;

  const [bettingNumber, setBettingNumber] = useState('');
  const [andarChecked, setAndarChecked] = useState(false); // Default unchecked
  const [baharChecked, setBaharChecked] = useState(false); // Default unchecked
  const [amount, setAmount] = useState('');
  const [entries, setEntries] = useState([]);
  const [totalBet, setTotalBet] = useState(0);

  // Effect to calculate total bet from entries
  useEffect(() => {
    const calculatedTotal = entries.reduce((sum, item) => sum + item.amount, 0);
    setTotalBet(calculatedTotal);
  }, [entries]);

  // useEffect for real-time updates
  useEffect(() => {
    // Validate inputs for real-time generation
    if (!bettingNumber || bettingNumber.length === 0) {
      setEntries([]); return;
    }
    const parsedAmount = parseInt(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setEntries([]); return;
    }
    if (!andarChecked && !baharChecked) {
      setEntries([]); // Clear table if no checkbox is selected
      return;
    }

    // Generate entries if inputs are valid
    const uniqueDigits = [...new Set(bettingNumber.split(''))];
    const newEntriesToAdd = [];
    const timestamp = Date.now();
    let entryCounter = 0;

    uniqueDigits.forEach(digit => {
      if (andarChecked) {
        newEntriesToAdd.push({
          key: `${timestamp}_${digit}_A_${entryCounter++}`,
          number: `${digit}A`,
          amount: parsedAmount,
        });
      }
      if (baharChecked) {
        newEntriesToAdd.push({
          key: `${timestamp}_${digit}_B_${entryCounter++}`,
          number: `${digit}B`,
          amount: parsedAmount,
        });
      }
    });

    // Sort alphabetically
    newEntriesToAdd.sort((a, b) => a.number.localeCompare(b.number));
    setEntries(newEntriesToAdd);

  }, [bettingNumber, amount, andarChecked, baharChecked]); // Dependencies

  const columns = [
    { title: 'Number', dataIndex: 'number', key: 'number', width: '50%' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', width: '50%' },
  ];

  const handleBettingNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 10) { // Max length 10 based on image
      setBettingNumber(value);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const handleRefresh = () => {
      setEntries([]);
      setBettingNumber('');
      setAmount('');
      setAndarChecked(false); // Reset checkbox
      setBaharChecked(false); // Reset checkbox
      message.success('Entries cleared');
  }

  const handlePlaceBet = () => {
      if (entries.length === 0) {
          message.warning('No bets to place.');
          return;
      }
      // Navigate back to Gameplay with gameName and pass the entries
      const targetPath = currentGameName ? `/gameplay/${currentGameName}` : '/gameplay';
      navigate(targetPath, { state: { placedBets: entries } });
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StyledHeader>
         <BackButton type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
         <HeaderTitle>Andar Bahar</HeaderTitle>
      </StyledHeader>

      <StyledContent>
        <InputContainer>
          <Text style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
            Betting number
          </Text>
          <StyledInput
            value={bettingNumber}
            onChange={handleBettingNumberChange}
            placeholder="Enter digits"
            maxLength={10}
            suffix={<Text style={{ color: '#999', fontSize: '12px' }}>{bettingNumber.length}/10</Text>}
          />

          <CheckboxContainer gutter={16}>
             <Col flex="auto">
                <Space align="center">
                    <Text style={{ color: '#666' }}>Andar</Text>
                    <Checkbox checked={andarChecked} onChange={(e) => setAndarChecked(e.target.checked)} />
                </Space>
             </Col>
             <Col flex="auto">
                <Space align="center">
                    <Text style={{ color: '#666' }}>Bahar</Text>
                    <Checkbox checked={baharChecked} onChange={(e) => setBaharChecked(e.target.checked)} />
                </Space>
            </Col>
          </CheckboxContainer>

           <Row style={{ marginTop: '15px' }}>
             <Col span={24}>
                <StyledInput
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Amount"
                    type="tel"
                />
             </Col>
           </Row>
        </InputContainer>

        <StyledTable
          columns={columns}
          dataSource={entries}
          pagination={false}
          rowKey="key"
          size="small"
        />

      </StyledContent>

      <StyledFooter>
        <RefreshButton onClick={handleRefresh}>Refresh</RefreshButton>
        <TotalBetText>Total Bet : {totalBet}</TotalBetText>
        <PlaceBetButton onClick={handlePlaceBet}>Place Bet</PlaceBetButton>
      </StyledFooter>
    </Layout>
  );
};

export default AndarBahar; 