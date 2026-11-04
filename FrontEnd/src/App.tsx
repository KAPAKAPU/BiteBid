import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CampaignDetails from "./pages/CampaignDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
