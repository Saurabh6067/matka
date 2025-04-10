import React, { useState } from 'react';
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Switch,
  Slider,
  Space,
  Input
} from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'; // Assuming some styles might be here

const { Header, Content } = Layout;
const { Text, Title } = Typography;

// --- Removed Size Interpolation ---
// Fixed sizes (adjust as needed)
const BOX_HEIGHT = '40px';
const LABEL_FONT_SIZE = '19px';
const INPUT_FONT_SIZE = '10px';
const INPUT_PADDING = '1px 2px';
const ITEM_HORIZONTAL_PADDING = '2px'; // Padding on each side of the outer wrapper

const GamePlay = () => {
  const navigate = useNavigate();
  const { gameName } = useParams(); // Get game name from URL if needed
  const [betAmounts, setBetAmounts] = useState({}); // State for input values
  const [withPalti, setWithPalti] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100); // Default to 100 (10 columns)

  // Mock balance - replace with actual state management
  const balance = 49476;
  const totalBet = 0; // Calculate based on selected numbers

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
           <Col span={8}><Button block style={{backgroundColor: '#5a189a', color: 'white'}}>CROSSING</Button></Col>
           <Col span={8}><Button block style={{backgroundColor: '#5a189a', color: 'white'}}>OPEN PLAY</Button></Col>
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

    </Layout>
  );
};

export default GamePlay; 