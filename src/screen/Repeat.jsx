import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Button,
  Typography,
  message,
  Row,
  Col,
  Card
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// --- Reusing Styled Components (consider moving to common files) --- 

const { Header, Content } = Layout;
const { Text, Paragraph } = Typography;

const StyledHeader = styled(Header)` background-color: #5a189a; color: white; display: flex; align-items: center; justify-content: center; padding: 0 16px; position: relative; `;
const BackButton = styled(Button)` position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: white !important; border: none !important; background: transparent !important; &:hover, &:focus { background: rgba(255, 255, 255, 0.1) !important; } `;
const HeaderTitle = styled(Text)` color: white; font-size: 18px; font-weight: 500; `;
const StyledContent = styled(Content)` padding: 16px; background: #f0f2f5; `;

const BetCard = styled(Card)`
  margin-bottom: 16px;
  .ant-card-body {
    padding: 0; // Remove default padding
  }
`;

const BetDisplay = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 8px 8px 0 0; // Rounded top corners
  word-break: break-word; // Prevent long strings from overflowing
  line-height: 1.6;
`;

const SelectButton = styled(Button)`
  background-color: #5a189a;
  color: white;
  width: 100%;
  height: 45px;
  font-size: 16px;
  border-radius: 0 0 8px 8px; // Rounded bottom corners
  border: none;

  &:hover, &:focus {
    background-color: #48137a !important;
    color: white !important;
  }
`;

// --- Component Logic --- 

const Repeat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve data passed from GamePlay
  const currentGameName = location.state?.gameName;
  const lastBets = location.state?.lastBets || []; // Default to empty array

  const [totalAmount, setTotalAmount] = useState(0);
  const [formattedBets, setFormattedBets] = useState("");

  useEffect(() => {
    if (lastBets && lastBets.length > 0) {
      let calculatedTotal = 0;
      const formattedString = lastBets.map(bet => {
        const amount = parseInt(bet.amount) || 0;
        calculatedTotal += amount;
        return `${bet.number}(${amount})`;
      }).join(' '); // Join with space

      setFormattedBets(formattedString);
      setTotalAmount(calculatedTotal);
    } else {
        setFormattedBets("");
        setTotalAmount(0);
    }
  }, [lastBets]);

  const handleSelectBet = () => {
    if (!lastBets || lastBets.length === 0) {
        message.warning("No bets to select.");
        return;
    }
     // Navigate back to Gameplay with gameName and pass the selected bets
     const targetPath = currentGameName ? `/gameplay/${currentGameName}` : '/gameplay';
     navigate(targetPath, { state: { placedBets: lastBets } });
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StyledHeader>
         <BackButton type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
         <HeaderTitle>Repeat</HeaderTitle>
      </StyledHeader>

      <StyledContent>
        {lastBets && lastBets.length > 0 ? (
            <BetCard bordered={false}>
                 <BetDisplay>
                     <Paragraph>{formattedBets}</Paragraph>
                 </BetDisplay>
                <SelectButton onClick={handleSelectBet}>
                    Select Bet ({totalAmount})
                </SelectButton>
             </BetCard>
        ) : (
          <Card><Paragraph style={{textAlign: 'center'}}>No recent bets found to repeat.</Paragraph></Card>
        )}
      </StyledContent>

       {/* No Footer needed for this screen based on image */}
    </Layout>
  );
};

export default Repeat; 