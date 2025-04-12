import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Input,
  Layout,
  message,
  Row,
  Slider,
  Space,
  Switch,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../App.css'; // Assuming some styles might be here
import OpenPlay from './OpenPlay';

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;

// --- Removed Size Interpolation ---
// Fixed sizes (adjust as needed)
const BOX_HEIGHT = '40px';
const LABEL_FONT_SIZE = '13px';
const INPUT_FONT_SIZE = '13px';
const INPUT_PADDING = '1px 2px';
const ITEM_HORIZONTAL_PADDING = '2px'; // Padding on each side of the outer wrapper

const GamePlay = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get location object
  const { gameName } = useParams(); // Get game name from URL if needed
  const [betAmounts, setBetAmounts] = useState({}); // State for input values
  const [withPalti, setWithPalti] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100); // Default to 100 (10 columns)
  const [totalBetAmount, setTotalBetAmount] = useState(0); // State for total bet

  // Mock balance - replace with actual state management
  const balance = 49476;

  // useEffect to process bets passed from CrossPlay
  useEffect(() => {
    // Only proceed if placedBets exists in the state
    if (location.state?.placedBets) {
      console.log("[GamePlay] Received placedBets:", location.state.placedBets); // Debugging line

      // Ensure placedBets is an array
      if (!Array.isArray(location.state.placedBets)) {
        console.error("[GamePlay] Invalid data received: placedBets is not an array.", location.state.placedBets);
        // Clear the invalid state immediately
        navigate(location.pathname || '/gameplay', { replace: true, state: {} });
        return; // Stop processing
      }

      const newBetAmounts = {};
      let processedSuccessfully = true; // Flag to track processing

      location.state.placedBets.forEach(bet => {
        // Validate each bet object
        if (bet && typeof bet.number !== 'undefined' && bet.number !== null && typeof bet.amount !== 'undefined' && bet.amount !== null) {
          // Pad single-digit numbers like '1' to '01' to match grid keys
          const numberStr = String(bet.number).padStart(2, '0');
          const amountStr = String(bet.amount);
          newBetAmounts[numberStr] = amountStr;
        } else {
          console.warn("[GamePlay] Skipping invalid bet object:", bet);
          processedSuccessfully = false; // Mark as potentially incomplete
        }
      });

      console.log("[GamePlay] Processed newBetAmounts:", newBetAmounts); // Debugging line

      // Update state only if processing resulted in new amounts
      if (Object.keys(newBetAmounts).length > 0) {
          setBetAmounts(prev => ({ ...prev, ...newBetAmounts }));
      }

      // Always attempt to clear the state to prevent re-processing
      // Use gameName from params for the target path
      const targetPath = gameName ? `/gameplay/${gameName}` : '/gameplay'; // More direct path construction
      console.log(`[GamePlay] Navigating to ${targetPath} to clear state.`); // Debugging line
      navigate(targetPath, { replace: true, state: {} });

    }
  // Depend on gameName directly if used for navigation path
  }, [location.state, navigate, gameName]);

  // useEffect to calculate total bet amount
  useEffect(() => {
    let total = 0;
    Object.values(betAmounts).forEach(amount => {
      const parsedAmount = parseInt(amount);
      if (!isNaN(parsedAmount) && parsedAmount > 0) {
        total += parsedAmount;
      }
    });
    setTotalBetAmount(total);
  }, [betAmounts]);

  // Handle changes in bet input fields
  const handleBetChange = (numberKey, value) => {
    // Allow only digits, limit length if desired
    const numericValue = value.replace(/[^0-9]/g, '');
    setBetAmounts(prev => ({
      ...prev,
      [numberKey]: numericValue,
    }));
  };

  // Calculate number of columns based on zoom level
  const calculateColumns = (level) => {
    // Maps 0-100 slider range to 4-10 columns
    const rawCols = Math.ceil(level / 10);
    return Math.max(4, Math.min(10, rawCols)); // Clamp between 4 and 10
  };

  // Grid rendering function now accepts numberOfColumns
  const renderNumberGrid = (start, end, numberOfColumns) => {
    const items = [];
    for (let i = start; i <= end; i++) {
      const numStr = String(i).padStart(2, '0');
      const numberKey = numStr;

      items.push(
        // Outer wrapper sets the column width based on numberOfColumns
        <div
          key={numberKey}
          style={{
            flexBasis: `calc(100% / ${numberOfColumns})`, // Width based on columns
            boxSizing: 'border-box',
            minWidth: 0, // Important for flex basis
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: ITEM_HORIZONTAL_PADDING,
            paddingRight: ITEM_HORIZONTAL_PADDING,
            marginBottom: '5px', // Add some vertical spacing between rows
          }}
        >
          {/* Label */}
          <Text style={{ fontSize: LABEL_FONT_SIZE, color: '#000', lineHeight: 1, textAlign: 'center', marginBottom: '5px' , marginTop: '15px' }}>
            {numStr}
          </Text>
          {/* Inner Box */}
          <div
            style={{
              width: '100%',
              height: BOX_HEIGHT, // Fixed height
              border: `0.5px solid #d9d9d9`,
              borderRadius: 10, // Changed back from 10
              backgroundColor: betAmounts[numberKey] ? '#e6f7ff' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              padding: '1px',
            }}
          >
            <Input
              value={betAmounts[numberKey] || ''}
              onChange={(e) => handleBetChange(numberKey, e.target.value)}
              maxLength={4}
              style={{
                width: '95%',
                fontSize: INPUT_FONT_SIZE, // Fixed size
                textAlign: 'center',
                padding: INPUT_PADDING,     // Fixed padding
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                lineHeight: 1,
              }}
            />
          </div>
        </div>
      );
    }
    // Container uses flexWrap
    return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{items}</div>;
  };

   // Grid rendering function now accepts numberOfColumns
   const renderSingleDigitGrid = (label, numberOfColumns) => {
    const items = [];
     // Note: ANDAR/BAHAR have 10 items (0-9). We'll use the same column logic.
     // If exactly 10 columns are desired for these regardless of slider, adjust logic here.
    for (let i = 0; i <= 9; i++) {
      const numberKey = `${label}-${i}`;
      const displayLabel = String(i);

      items.push(
        // Outer wrapper sets the column width based on numberOfColumns
        <div
          key={numberKey}
          style={{
            flexBasis: `calc(100% / ${numberOfColumns})`, // Width based on columns
            boxSizing: 'border-box',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: ITEM_HORIZONTAL_PADDING,
            paddingRight: ITEM_HORIZONTAL_PADDING,
            marginBottom: '5px',
          }}
        >
          {/* Label */}
          <Text style={{ fontSize: LABEL_FONT_SIZE, color: '#888', lineHeight: 1, textAlign: 'center', marginBottom: '3px' }}>
            {displayLabel}
          </Text>
          {/* Inner Box */}
          <div
            style={{
              width: '100%',
              height: BOX_HEIGHT, // Fixed height
              border: `0.5px solid #d9d9d9`,
              borderRadius: 0,
              backgroundColor: betAmounts[numberKey] ? '#e6f7ff' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              padding: '1px',
            }}
          >
            <Input
              value={betAmounts[numberKey] || ''}
              onChange={(e) => handleBetChange(numberKey, e.target.value)}
              maxLength={4}
              style={{
                width: '95%',
                fontSize: INPUT_FONT_SIZE, // Fixed size
                textAlign: 'center',
                padding: INPUT_PADDING,     // Fixed padding
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                lineHeight: 1,
              }}
            />
          </div>
        </div>
      );
    }
    return (
      <div style={{ marginTop: '15px' }}>
        <Title level={5} style={{ textAlign: 'center', marginBottom: '8px' }}>{label}</Title>
        {/* Container uses flexWrap */}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{items}</div>
      </div>
    );
  };

  // Calculate columns based on current zoom level
  const numCols = calculateColumns(zoomLevel);

  // Function to handle refresh
  const handleRefresh = () => {
    setBetAmounts({});
    message.info('Bets cleared');
  };

  // Function to handle placing bet
  const handlePlaceBet = () => {
    const validBets = Object.entries(betAmounts)
      .filter(([key, value]) => parseInt(value) > 0)
      .map(([key, value]) => ({ number: key, amount: parseInt(value) }));

    if (validBets.length === 0) {
      message.warning('No bets to place.');
      return;
    }
    // Replace with actual bet placement logic
    console.log("Placing bets from Gameplay:", validBets);
    message.success(`Placed ${validBets.length} bets with total amount ${totalBetAmount}`);
    // Optionally clear bets after placement
    // setBetAmounts({});
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Header */}
      <Header style={{
        backgroundColor: '#5a189a',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'fixed',
        width: '100%',
        zIndex: 1,
      }}>
        <ArrowLeftOutlined onClick={() => navigate(-1)} style={{ fontSize: '20px', cursor: 'pointer' }} />
        <Space>
           <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: 'transparent', border: '1px solid white' }}>
             Add
           </Button>
          <Text style={{ color: 'white', fontWeight: 'bold', border: '1px solid white', padding: '5px 10px', borderRadius: '4px' }}>
             ₹ {balance}
          </Text>
        </Space>
      </Header>

      {/* Content Area */}
      <Content style={{ padding: '80px 0 16px 0' }}> {/* Removed horizontal padding */}
         {/* Top Action Buttons */}
         <Row gutter={[8, 8]} style={{ marginBottom: '16px', padding: '0 5px' }}> {/* Keep padding for buttons */}
           <Col span={8}><Button block style={{backgroundColor: '#5a189a', color: 'white'}} onClick={() => navigate('/crossplay', { state: { gameName: gameName } })}>CROSSING</Button></Col>
           <Col span={8}><Button block style={{backgroundColor: '#5a189a', color: 'white'}} onClick={() => navigate('/openplay', { state: { gameName: gameName } })}>OPEN PLAY</Button></Col>
           <Col span={8}><Button block style={{backgroundColor: '#5a189a', color: 'white'}}>COPY PASTE</Button></Col>
           <Col span={8}><Button block style={{backgroundColor: '#5a189a', color: 'white'}}>HARUF</Button></Col>
           <Col span={8}><Button block style={{backgroundColor: '#5a189a', color: 'white'}}>FROM INTO</Button></Col>
           <Col span={8}><Button block style={{backgroundColor: '#5a189a', color: 'white'}}>REPEAT</Button></Col>
         </Row>

         {/* Zoom Slider and Palti Switch */} 
         <Row justify="space-between" align="middle" style={{ marginBottom: '16px', padding: '0 5px' }}> {/* Keep padding for controls */}
           <Col flex="auto" style={{ paddingRight: '10px' }}>
             <Slider
                min={0}
                max={100}
                defaultValue={zoomLevel}
                onChange={setZoomLevel}
                 // Optional: Add step={10} for clearer column changes
                tooltip={{ formatter: (value) => `${calculateColumns(value)} cols` }} // Update tooltip
             />
           </Col>
           <Col>
            <Space>
                <Text strong style={{ color: '#5a189a', whiteSpace: 'nowrap' }}>WITH PALTI</Text>
                <Switch checked={withPalti} onChange={setWithPalti} size="small" />
            </Space>
           </Col>
         </Row>

        

         {/* Jantry Play Grid - Pass numCols */}
         <Title level={5} style={{ textAlign: 'center', marginBottom: '10px', color: '#5a189a' }}>JANTRY PLAY</Title>
         {renderNumberGrid(0, 9, numCols)}
         {renderNumberGrid(10, 19, numCols)}
         {renderNumberGrid(20, 29, numCols)}
         {renderNumberGrid(30, 39, numCols)}
         {renderNumberGrid(40, 49, numCols)}
         {renderNumberGrid(50, 59, numCols)}
         {renderNumberGrid(60, 69, numCols)}
         {renderNumberGrid(70, 79, numCols)}
         {renderNumberGrid(80, 89, numCols)}
         {renderNumberGrid(90, 99, numCols)}

         {/* Andar Grid - Pass numCols */}
         {renderSingleDigitGrid('ANDAR', numCols)}

         {/* Bahar Grid - Pass numCols */}
         {renderSingleDigitGrid('BAHAR', numCols)}

      </Content>

      {/* Fixed Footer */}
      <Footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#5a189a',
        color: 'white',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
      }}>
        <Button
          style={{ backgroundColor: '#28a745', color: 'white', border: 'none' }}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Total Bet : {totalBetAmount}</Text>
        <Button
          style={{ backgroundColor: '#5a189a', border: '1px solid white', color: 'white' }}
          onClick={handlePlaceBet}
        >
          Place Bet
        </Button>
      </Footer>

    </Layout>
  );
};

export default GamePlay; 