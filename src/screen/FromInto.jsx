import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Button,
  Input,
  Table,
  Typography,
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

const StyledHeader = styled(Header)` background-color: #5a189a; color: white; display: flex; align-items: center; justify-content: center; padding: 0 16px; position: relative; `;
const BackButton = styled(Button)` position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: white !important; border: none !important; background: transparent !important; &:hover, &:focus { background: rgba(255, 255, 255, 0.1) !important; } `;
const HeaderTitle = styled(Text)` color: white; font-size: 18px; font-weight: 500; `;
const StyledContent = styled(Content)` padding: 16px; background: #fff; `;
const InputContainer = styled.div` margin-bottom: 20px; `;
const StyledInput = styled(Input)` border-radius: 8px; height: 40px; border: 1px solid #d9d9d9; `;
const SaveButton = styled(Button)` background-color: #5a189a; color: white; width: 100%; height: 45px; font-size: 16px; border-radius: 8px; margin-top: 20px; margin-bottom: 20px; &:hover, &:focus { background-color: #48137a !important; color: white !important; } `;
const StyledTable = styled(Table)` .ant-table-thead > tr > th { background-color: #5a189a !important; color: white !important; text-align: center; padding: 10px 8px; } .ant-table-tbody > tr > td { text-align: center; padding: 10px 8px; border: none; } .ant-table-tbody > tr:nth-child(even) > td { background-color: #f0e6ff; } .ant-table-tbody > tr:nth-child(odd) > td { background-color: #e9d8f5; } .ant-table-tbody > tr.ant-table-row:hover > td { background: #d4b8e8; } `;
const StyledFooter = styled(Footer)` position: fixed; bottom: 0; left: 0; width: 100%; background-color: #5a189a; color: white; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; z-index: 10; `;
const RefreshButton = styled(Button)` background-color: #28a745; color: white; border: none; &:hover, &:focus { background-color: #218838 !important; color: white !important; } `;
const PlaceBetButton = styled(Button)` background-color: #5a189a; border: 1px solid white; color: white; &:hover, &:focus { background-color: #48137a !important; color: white !important; } `;
const TotalBetText = styled(Text)` color: white; font-weight: bold; `;

// --- Component Logic --- 

const FromInto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentGameName = location.state?.gameName;

  const [fromNumber, setFromNumber] = useState('');
  const [intoNumber, setIntoNumber] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [entries, setEntries] = useState([]);
  const [totalBet, setTotalBet] = useState(0);

  // Effect to calculate total bet from entries
  useEffect(() => {
    const calculatedTotal = entries.reduce((sum, item) => sum + item.amount, 0);
    setTotalBet(calculatedTotal);
  }, [entries]);

  // useEffect for real-time updates
  useEffect(() => {
    // Validation
    const fromVal = parseInt(fromNumber);
    const intoVal = parseInt(intoNumber);
    const amountVal = parseInt(betAmount);

    // Clear table if inputs are invalid or incomplete
    if (isNaN(fromVal) || fromVal < 0 ||
        isNaN(intoVal) || intoVal < 0 ||
        isNaN(amountVal) || amountVal <= 0 ||
        (fromNumber && intoNumber && fromVal > intoVal) ) { // Only check from > into if both are present
      setEntries([]);
      return;
    }

    // Generate entries if inputs are valid
    const newEntriesToAdd = [];
    const timestamp = Date.now();

    for (let i = fromVal; i <= intoVal; i++) {
        const formattedNumber = String(i).padStart(2, '0');
        newEntriesToAdd.push({
            key: `${timestamp}_${i}`,
            number: formattedNumber,
            amount: amountVal,
        });
    }

    // Sort numerically before setting state
    newEntriesToAdd.sort((a, b) => parseInt(a.number) - parseInt(b.number));
    setEntries(newEntriesToAdd);

  }, [fromNumber, intoNumber, betAmount]); // Dependencies

  const columns = [
    { title: 'Number', dataIndex: 'number', key: 'number', width: '50%' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', width: '50%' },
  ];

  const handleNumericInputChange = (setter) => (e) => {
      const value = e.target.value.replace(/[^0-9]/g, '');
      setter(value);
  };

  const handleRefresh = () => {
      setEntries([]);
      setFromNumber('');
      setIntoNumber('');
      setBetAmount('');
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
         <HeaderTitle>FROM INTO</HeaderTitle>
      </StyledHeader>

      <StyledContent>
        <InputContainer>
          {/* From and Into Inputs */}
          <Row gutter={16} style={{ marginBottom: '15px' }}>
            <Col span={12}>
                <StyledInput
                    value={fromNumber}
                    onChange={handleNumericInputChange(setFromNumber)}
                    placeholder="From"
                    maxLength={2} // Assuming max 99
                    type="tel"
                />
            </Col>
            <Col span={12}>
                <StyledInput
                    value={intoNumber}
                    onChange={handleNumericInputChange(setIntoNumber)}
                    placeholder="Into"
                    maxLength={2} // Assuming max 99
                    type="tel"
                />
            </Col>
          </Row>

          {/* Bet Amount Input */}
           <Row>
             <Col span={24}>
                <Text style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
                    Bet Amount
                </Text>
                <StyledInput
                    value={betAmount}
                    onChange={handleNumericInputChange(setBetAmount)}
                    placeholder="Amount"
                    maxLength={4}
                    suffix={<Text style={{ color: '#999', fontSize: '12px' }}>{betAmount.length}/4</Text>}
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

export default FromInto; 