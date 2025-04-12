import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Button,
  Input,
  Table,
  Typography,
  Space,
  Row,
  Col,
  Checkbox,
  message,
} from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

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
  color: white !important; // Override default Antd styles
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
  background: #fff; // White background as per image
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
  border-radius: 8px;
  height: 40px;
  border: 1px solid #d9d9d9;
`;

const JodaContainer = styled(Row)`
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
    border: none; // Remove default borders if needed
  }

  .ant-table-tbody > tr:nth-child(even) > td {
    background-color: #f0e6ff; // Light purple for even rows
  }
  .ant-table-tbody > tr:nth-child(odd) > td {
     background-color: #e9d8f5; // Slightly darker purple for odd rows
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #d4b8e8; // Hover effect
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
  z-index: 10; // Ensure footer stays on top
`;

const RefreshButton = styled(Button)`
  background-color: #28a745; // Green color
  color: white;
  border: none;
   &:hover, &:focus {
    background-color: #218838 !important;
    color: white !important;
  }
`;

const PlaceBetButton = styled(Button)`
  background-color: #5a189a; // Same as header/footer
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

const CrossPlay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bettingNumber, setBettingNumber] = useState('');
  const [withJoda, setWithJoda] = useState(false); // Default to unchecked
  const [jodaAmount, setJodaAmount] = useState('');
  const [entries, setEntries] = useState([]);
  const [totalBet, setTotalBet] = useState(0);
  const currentGameName = location.state?.gameName;

  useEffect(() => {
    // Recalculate total bet whenever entries change
    const calculatedTotal = entries.reduce((sum, item) => sum + item.amount, 0);
    setTotalBet(calculatedTotal);
  }, [entries]);

  // useEffect to update entries in real-time
  useEffect(() => {
    const uniqueDigits = [...new Set(bettingNumber.split(''))];
    const parsedAmount = parseInt(jodaAmount);

    // Only calculate if inputs are valid
    if (uniqueDigits.length >= 2 && !isNaN(parsedAmount) && parsedAmount > 0) {
      const newEntries = [];
      const timestamp = Date.now();
      let entryCounter = 0;

      // Generate cross pairs
      for (let i = 0; i < uniqueDigits.length; i++) {
        for (let j = i + 1; j < uniqueDigits.length; j++) {
          const digit1 = uniqueDigits[i];
          const digit2 = uniqueDigits[j];
          const pair1 = digit1 + digit2;
          const pair2 = digit2 + digit1;
          newEntries.push({ key: `${timestamp}_${entryCounter++}`, number: pair1, amount: parsedAmount });
          newEntries.push({ key: `${timestamp}_${entryCounter++}`, number: pair2, amount: parsedAmount });
        }
      }

      // Generate jodis if checked
      if (withJoda) {
        for (let i = 0; i < uniqueDigits.length; i++) {
          const digit = uniqueDigits[i];
          const jodi = digit + digit;
          newEntries.push({ key: `${timestamp}_jodi_${entryCounter++}`, number: jodi, amount: parsedAmount });
        }
      }

      // Sort the generated entries numerically by number before setting state
      newEntries.sort((a, b) => parseInt(a.number) - parseInt(b.number));

      setEntries(newEntries);
    } else {
      // Clear entries if inputs are invalid or incomplete
      setEntries([]);
    }
  }, [bettingNumber, jodaAmount, withJoda]); // Dependencies for real-time update

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
    // Allow up to 7 digits based on image suffix "6/7"
    if (value.length <= 7) {
      setBettingNumber(value);
    }
  };

  const handleJodaAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
     // Add max length or value validation if needed
    setJodaAmount(value);
  };

  const generateCrossNumber = (num) => {
    if (num.length !== 2) return null; // Return null if not 2 digits
    return num[1] + num[0];
  };

  const handleRefresh = () => {
      setEntries([]); // Clear all entries
      setBettingNumber('');
      setJodaAmount('');
      // Potentially refetch balance or other data here
      message.success('Entries cleared');
  }

  const handlePlaceBet = () => {
      if (entries.length === 0) {
          message.warning('No bets to place.');
          return;
      }
      // Construct the correct path with gameName
      const targetPath = currentGameName ? `/gameplay/${currentGameName}` : '/gameplay'; // Fallback if gameName wasn't passed

      // Navigate back to Gameplay with gameName in path and pass the entries in state
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
        <HeaderTitle>Cross Play</HeaderTitle>
        {/* Removed Add button and Balance from header */}
      </StyledHeader>

      <StyledContent>
        <InputContainer>
          <Text style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
            Betting number
          </Text>
          <StyledInput
            value={bettingNumber}
            onChange={handleBettingNumberChange}
            placeholder="Enter number"
            maxLength={7}
            suffix={<Text style={{ color: '#999', fontSize: '12px' }}>{bettingNumber.length}/7</Text>}
          />
          {/* Updated max length based on image */}

          <JodaContainer gutter={16}>
             <Col flex="auto">
                <Space align="center">
                    <Text style={{ color: '#666' }}>With Joda</Text>
                    <Checkbox checked={withJoda} onChange={(e) => setWithJoda(e.target.checked)} />
                </Space>
            </Col>
            <Col flex="150px"> {/* Fixed width for amount input */}
              <StyledInput
                value={jodaAmount}
                onChange={handleJodaAmountChange}
                placeholder="Amount"
                type="tel" // Use tel for numeric keyboard on mobile
              />
            </Col>
          </JodaContainer>
        </InputContainer>

        {/* Save button removed, generation is real-time */}

        <StyledTable
          columns={columns}
          dataSource={entries}
          pagination={false}
          bordered={false} // Remove outer/inner borders if needed
          rowKey="key"
          size="small" // Make table compact
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

export default CrossPlay; 