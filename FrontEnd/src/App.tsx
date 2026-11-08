import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CampaignDetails from "./pages/CampaignDetails";
import Login from "./pages/Login";
import BusinessRegister from "./pages/BusinessRegister";
import VerifyOTP from "./pages/VerifyOTP";
import AccountRecovery from "./pages/AccountRecovery";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        <Route path="/business/register" element={<BusinessRegister />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/account-recovery" element={<AccountRecovery />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
