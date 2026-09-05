import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./Account";
import Login from "./UserLogin";
import Logout from "./Logout";
import UpiPaymentPage from "./UpiPaymentPage";
import Settings from "./Settings";
import { AuthProvider } from "./AuthContext"; // ✅ named import

function Update() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Removed the /AuthContext route; usually not needed */}
          <Route path="/" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/upipaymentpage" element={<UpiPaymentPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Update;
