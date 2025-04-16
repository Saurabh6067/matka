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
  Col
} from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// --- Reusing Styled Components --- 

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const StyledHeader = styled(Header)` background-color: #5a189a; color: white; display: flex; align-items: center; justify-content: center; padding: 0 16px; position: relative; `;
const BackButton = styled(Button)` position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: white !important; border: none !important; background: transparent !important; &:hover, &:focus { background: rgba(255, 255, 255, 0.1) !important; } `;
const HeaderTitle = styled(Text)` color: white; font-size: 18px; font-weight: 500; `;
const StyledContent = styled(Content)` padding: 16px; background: #fff; `;
const InputContainer = styled.div` margin-bottom: 20px; `;
// Using Input.TextArea for potentially multi-line pastes
const StyledTextArea = styled(Input.TextArea)` 
  border-radius: 8px; 
  border: 1px solid #d9d9d9; 
  min-height: 80px !important; // Ensure decent height
`; 
const SaveButton = styled(Button)` background-color: #5a189a; color: white; width: 100%; height: 45px; font-size: 16px; border-radius: 8px; margin-top: 20px; margin-bottom: 20px; &:hover, &:focus { background-color: #48137a !important; color: white !important; } `;
const StyledTable = styled(Table)` .ant-table-thead > tr > th { background-color: #5a189a !important; color: white !important; text-align: center; padding: 10px 8px; } .ant-table-tbody > tr > td { text-align: center; padding: 10px 8px; border: none; } .ant-table-tbody > tr:nth-child(even) > td { background-color: #f0e6ff; } .ant-table-tbody > tr:nth-child(odd) > td { background-color: #e9d8f5; } .ant-table-tbody > tr.ant-table-row:hover > td { background: #d4b8e8; } `;
const StyledFooter = styled(Footer)` position: fixed; bottom: 0; left: 0; width: 100%; background-color: #5a189a; color: white; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; z-index: 10; `;
const RefreshButton = styled(Button)` background-color: #28a745; color: white; border: none; &:hover, &:focus { background-color: #218838 !important; color: white !important; } `;
const PlaceBetButton = styled(Button)` background-color: #5a189a; border: 1px solid white; color: white; &:hover, &:focus { background-color: #48137a !important; color: white !important; } `;
const TotalBetText = styled(Text)` color: white; font-weight: bold; `;

// --- Component Logic --- 

const CopyPaste = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentGameName = location.state?.gameName;

  const [pasteInput, setPasteInput] = useState('');
  const [entries, setEntries] = useState([]);
  const [totalBet, setTotalBet] = useState(0);

  // Effect to calculate total bet from entries
  useEffect(() => {
    const calculatedTotal = entries.reduce((sum, item) => sum + item.amount, 0);
    setTotalBet(calculatedTotal);
  }, [entries]);


  const columns = [
    { title: 'Number', dataIndex: 'number', key: 'number', width: '50%' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', width: '50%' },
  ];

  const handleInputChange = (e) => {
      setPasteInput(e.target.value);
  };

  const handleSave = () => {
    const regex = /(\d+)\((\d+)\)/g; // Regex to find Number(Amount)
    let match;
    const newEntriesToAdd = [];
    const timestamp = Date.now();
    let entryCounter = 0;
    let parseErrors = false;

    // Remove all whitespace from input before parsing
    const cleanInput = pasteInput.replace(/\s+/g, '');

    while ((match = regex.exec(cleanInput)) !== null) {
        const numberStr = match[1];
        const amountStr = match[2];
        const amountVal = parseInt(amountStr);

        // Basic validation
        // Assuming numbers are 2 digits based on other screens? Add validation if needed.
        if (!isNaN(amountVal) && amountVal > 0) {
             newEntriesToAdd.push({
                // Pad number if needed (assuming 2 digits for consistency)
                key: `${timestamp}_${entryCounter++}`,
                number: numberStr.padStart(2, '0'), 
                amount: amountVal,
            });
        } else {
            console.warn(`Invalid amount found for number ${numberStr}: ${amountStr}`);
            parseErrors = true;
        }
    }

    if (newEntriesToAdd.length === 0 && !parseErrors) {
        message.warning('Could not find any valid Number(Amount) pairs in the input.');
        return;
    }
    if (parseErrors) {
        message.error('Some amounts were invalid and were skipped.');
    }

    // Combine new entries with existing ones and sort
    const updatedEntries = [...entries, ...newEntriesToAdd];
    updatedEntries.sort((a, b) => parseInt(a.number) - parseInt(b.number));

    setEntries(updatedEntries);

    // Clear input after save
    setPasteInput('');
  };

  const handleRefresh = () => {
      setEntries([]);
      setPasteInput('');
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
         <HeaderTitle>Copy Paste</HeaderTitle>
      </StyledHeader>

      <StyledContent>
        <InputContainer>
           <Row>
             <Col span={24}>
                {/* Using TextArea for better paste experience */}
                <StyledTextArea
                    value={pasteInput}
                    onChange={handleInputChange}
                    placeholder="Paste bets here in Number(Amount) format, e.g., 10(20)35(5)01(50)"
                    rows={4}
                />
             </Col>
           </Row>
        </InputContainer>

        <SaveButton icon={<DownloadOutlined />} onClick={handleSave}> Save </SaveButton>

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

export default CopyPaste; 