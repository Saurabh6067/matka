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
  Modal, // Import Modal
  Row,
  Col,
  Space
} from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

// --- Reusing Styled Components from CrossPlay (adjust if needed) --- 

const StyledHeader = styled(Header)`
  background-color: #5a189a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center; // Center title
  padding: 0 16px;
  position: relative; // Needed for absolute positioning of back button
`;

const BackButton = styled(Button)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: white !important;
  border: none !important;
  background: transparent !important;

  &:hover, &:focus {
    background: rgba(255, 255, 255, 0.1) !important;
  }
`;

const HeaderTitle = styled(Text)`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const StyledContent = styled(Content)`
  padding: 16px;
  background: #fff; 
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
  border-radius: 8px;
  height: 40px;
  border: 1px solid #d9d9d9;
`;

const PaltiContainer = styled(Row)` // Renamed from JodaContainer
  margin-top: 15px;
  align-items: center;
`;

const SaveButton = styled(Button)`
  background-color: #5a189a;
  color: white;
  width: 100%;
  height: 45px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;

  &:hover, &:focus {
    background-color: #48137a !important;
    color: white !important;
  }
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #5a189a !important;
    color: white !important;
    text-align: center;
    padding: 10px 8px;
  }

  .ant-table-tbody > tr > td {
    text-align: center;
    padding: 10px 8px;
    border: none; 
  }

  .ant-table-tbody > tr:nth-child(even) > td {
    background-color: #f0e6ff; 
  }
  .ant-table-tbody > tr:nth-child(odd) > td {
     background-color: #e9d8f5; 
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #d4b8e8; 
  }
`;

const StyledFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #5a189a;
  color: white;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10; 
`;

const RefreshButton = styled(Button)`
  background-color: #28a745; 
  color: white;
  border: none;
   &:hover, &:focus {
    background-color: #218838 !important;
    color: white !important;
  }
`;

const PlaceBetButton = styled(Button)`
  background-color: #5a189a; 
  border: 1px solid white;
  color: white;
   &:hover, &:focus {
    background-color: #48137a !important;
    color: white !important;
  }
`;

const TotalBetText = styled(Text)`
  color: white;
  font-weight: bold;
`;

const OpenPlay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentGameName = location.state?.gameName;

  const [bettingNumber, setBettingNumber] = useState('');
  const [withPalti, setWithPalti] = useState(false); // Default to unchecked
  const [amount, setAmount] = useState('');
  const [entries, setEntries] = useState([]);
  const [totalBet, setTotalBet] = useState(0);

  // Effect to calculate total bet from entries
  useEffect(() => {
    const calculatedTotal = entries.reduce((sum, item) => sum + item.amount, 0);
    setTotalBet(calculatedTotal);
  }, [entries]);

  // useEffect for real-time updates based on inputs and checkbox
  useEffect(() => {
    // Only calculate if amount is valid
    const parsedAmount = parseInt(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
       setEntries([]); // Clear entries if amount is invalid
       return;
    }

    // Only calculate if betting number has even digits (or is empty)
    if (bettingNumber.length > 0 && bettingNumber.length % 2 !== 0) {
        // Don't show error constantly, just clear entries
        setEntries([]);
        return;
    }

    const newEntriesToAdd = [];
    const timestamp = Date.now();
    let entryCounter = 0;

    // Process the betting number string in pairs
    for (let i = 0; i < bettingNumber.length; i += 2) {
      const pair = bettingNumber.substring(i, i + 2);
      const isJodi = pair[0] === pair[1];

      // Add the pair itself
      newEntriesToAdd.push({
        key: `${timestamp}_${i}_pair_${entryCounter++}`,
        number: pair,
        amount: parsedAmount,
      });

      // Add palti if checkbox is checked and it's not a jodi
      if (withPalti && !isJodi) {
          const paltiPair = getPalti(pair);
          if (paltiPair) {
            newEntriesToAdd.push({
                key: `${timestamp}_${i}_palti_${entryCounter++}`,
                number: paltiPair,
                amount: parsedAmount,
            });
          }
      }
    }

    // Sort before setting state
    newEntriesToAdd.sort((a, b) => parseInt(a.number) - parseInt(b.number));
    setEntries(newEntriesToAdd);

  }, [bettingNumber, amount, withPalti]); // Dependencies for real-time update

  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      width: '50%',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '50%',
    },
  ];

  const handleBettingNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 20) { // Max length 20 based on image
      setBettingNumber(value);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  // Function to get reverse/palti of a 2-digit number
  const getPalti = (numStr) => {
      if (numStr.length !== 2) return null;
      return numStr[1] + numStr[0];
  }

  // Add handler for blur event on betting number input
  const handleBettingNumberBlur = () => {
    console.log('[OpenPlay] handleBettingNumberBlur called. Value:', bettingNumber); // Debug Log 1
    if (bettingNumber.length > 0 && bettingNumber.length % 2 !== 0) {
      console.log('[OpenPlay] Odd number of digits detected. Showing modal...'); // Debug Log 2
      Modal.error({
        title: 'Invalid Input',
        content: 'Only even number are allowed. Please add 1 more digit.',
        okText: 'Dismiss', // Set button text
        okButtonProps: { style: { backgroundColor: '#5a189a', borderColor: '#5a189a', color: 'white' } }
      });
      // Optionally, clear the input or handle focus
      // setBettingNumber(''); 
    }
  };

  const handleRefresh = () => {
      setEntries([]);
      setBettingNumber('');
      setAmount('');
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
         <BackButton
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
        <HeaderTitle>Open Play</HeaderTitle>
      </StyledHeader>

      <StyledContent>
        <InputContainer>
          <Text style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
            Betting number
          </Text>
          <StyledInput
            value={bettingNumber}
            onChange={handleBettingNumberChange}
            placeholder="Enter numbers (even digits)"
            maxLength={20}
            suffix={<Text style={{ color: '#999', fontSize: '12px' }}>{bettingNumber.length}/20</Text>}
            onBlur={handleBettingNumberBlur}
          />

          <PaltiContainer gutter={16}>
             <Col flex="auto">
                <Space align="center">
                    <Text style={{ color: '#666' }}>With Palti</Text>
                    <Checkbox checked={withPalti} onChange={(e) => setWithPalti(e.target.checked)} />
                </Space>
            </Col>
            <Col flex="150px">
              <StyledInput
                value={amount}
                onChange={handleAmountChange}
                placeholder="Amount"
                type="tel"
              />
            </Col>
          </PaltiContainer>
        </InputContainer>

        <StyledTable
          columns={columns}
          dataSource={entries} // Display accumulated entries
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

export default OpenPlay; 