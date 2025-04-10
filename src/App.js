import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginScreen from "./common/Login";
import HomeScreen from "./screen/Home";
import WalletScreen from "./screen/WalletScreen";
import HistoryScreen from "./screen/HistoryScreen";
import ChartScreen from "./screen/ChartScreen";
import HelpScreen from "./screen/HelpScreen";
import ProfileScreen from "./screen/ProfileScreen";
import PaymentDetails from "./screen/PaymentDetails";
import AddCash from "./screen/Addcash";
import Withdrawal from "./screen/Withdrawal";
import PayLater from "./screen/PayLater";
import ChangePassword from "./screen/ChangePassword";
import AgentDetails from "./screen/AgentDetails";
import FAQ from "./screen/FAQ";
import Rules from "./screen/Rules";
import ConvertWinning from "./screen/ConvertWinning"; // Import the new component
import GamePlay from "./screen/GamePlay"; // Import the GamePlay component
import MainHeader from "./common/Header";

// Layout component that conditionally renders the header
const AppLayout = ({ children }) => {
  const location = useLocation();
  
  // Hide header on specific pages
  const hideHeaderPaths = [
    "/profile", 
    "/", 
    "/payment", 
    "/add-cash", 
    "/withdrawal", 
    "/pay-later",
    "/change-password",
    "/agent",
    "/faq",
    "/rules",
    "/convert-winning",
    "/gameplay" // Add base path for gameplay to hide header
  ];
  // Check if the current path starts with any of the paths to hide
  const shouldShowHeader = !hideHeaderPaths.some(path => location.pathname.startsWith(path));
  
  // Determine the active tab for footer highlighting
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/home')) return 'home';
    if (path.includes('/wallet') || path.includes('/payment') || path.includes('/add-cash') || 
        path.includes('/withdrawal') || path.includes('/pay-later') || path.includes('/convert-winning')) return 'wallet';
    if (path.includes('/history')) return 'history';
    if (path.includes('/chart')) return 'chart';
    if (path.includes('/help') || path.includes('/faq') || path.includes('/rules')) return 'help';
    return '';
  };
  
  return (
    <>
      {shouldShowHeader && <MainHeader activeTab={getActiveTab()} />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/wallet" element={<WalletScreen />} />
          <Route path="/payment" element={<PaymentDetails />} />
          <Route path="/add-cash" element={<AddCash />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/pay-later" element={<PayLater />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/agent" element={<AgentDetails />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/convert-winning" element={<ConvertWinning />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/chart" element={<ChartScreen />} />
          <Route path="/help" element={<HelpScreen />} />
          <Route path="/profile" element={<ProfileScreen onBack={() => <Navigate to="/home" />} />} />
          <Route path="/gameplay/:gameName" element={<GamePlay />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;