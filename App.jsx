import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// ================= CONTEXT PROVIDERS =================
import { AuthProvider } from "./pages/AuthContext";
import { DriverAuthProvider } from "./Driver/DriverAuthContext";
import { AdminAuthProvider } from "./Admin/AdminAuthcontext";

// ================= LAYOUTS =================
import Header from "./pages/Header";
import Footer from "./pages/Footer";

// ================= PUBLIC PAGES =================
import Home from "./pages/Home";
import Services from "./pages/Services";
import Activity from "./pages/Activity";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import RegisterPage from "./pages/RegisterPage";
import AboutUs from "./pages/AboutUs";

// ================= LOGIN PAGES =================
import LoginOptions from "./pages/LoginOptions";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./Admin/AdminLogin";
import DriverLogin from "./Driver/DriverLogin";

// ================= USER PROTECTED =================
import ProtectRoute from "./pages/ProtectRoute";
import Account from "./pages/Account";
import Book from "./pages/Book";
import Courier from "./pages/Courier";
import CourierForm from "./pages/CourierForm";
import CourierTracking from "./pages/CourierTracking";
import UpiPaymentPage from "./pages/UpiPaymentPage";
import ConfirmRide1 from "./pages/ConfirmRide1";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import Update from "./pages/Update";
import Wallet from "./pages/Wallet";

// ================= DRIVER PROTECTED =================
import DriverProtectRoute from "./Driver/DriverProtectRoute";
import DriverLayout from "./Driver/DriverLayout";
import DriverDashboard from "./Driver/DriverDashboard";
import DriverEarnings from "./Driver/DriverEarnings";
import DriverRides from "./Driver/DriverRides";
import DriverProfile from "./Driver/DriverProfile";
import DriverLogout from "./Driver/DriverLogout";
import DriverLiveLocation from "./Driver/DriverLiveLocations";

// ================= ADMIN PROTECTED =================
import AdminProtectRoute from "./Admin/AdminProtectRoute";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminUsers from "./Admin/AdminUsers";
import AdminDrivers from "./Admin/AdminDrivers";
import AdminRides from "./Admin/AdminRides";
import AdminEarnings from "./Admin/AdminEarnings";
import AdminSettings from "./Admin/AdminSettings";
import AdminLogout from "./Admin/AdminLogout";

// ================= VEHICLES =================
import Cab from "./pages/Cab";
import CabBook from "./pages/CabBook";
import CabRental from "./pages/CabRental";
import BookCab from "./pages/BookCab";
import CabPayment from "./pages/CabPayment";

import Bike from "./pages/Bike";
import BikeBook from "./pages/BikeBook";
import BikeRental from "./pages/BikeRental";

import Auto from "./pages/Auto";
import AutoBook from "./pages/AutoBook";
import AutoRental from "./pages/AutoRental";

import Bus from "./pages/Bus";
import BusBook from "./pages/BusBook";
import BusRental from "./pages/BusRental";
import BusConfirm from "./pages/BusConfirm";
import BusSelectSeat from "./pages/BusSelectSeat";

import BookingHistory from "./pages/BookingHistory";

const App = () => {
  return (
    <AuthProvider>
      <DriverAuthProvider>
        <AdminAuthProvider>
          <Router>
            <Header />

            <Routes>

              {/* ===== PUBLIC ===== */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/aboutus" element={<AboutUs />} />

              {/* ===== VEHICLES ===== */}
              <Route path="/cab" element={<Cab />} />
              <Route path="/cab/book" element={<CabBook />} />
              <Route path="/cab/rental" element={<CabRental />} />

              {/* ✅ BOOKING + PAYMENT */}
              <Route path="/book-cab" element={<BookCab />} />
              <Route path="/cab-payment" element={<CabPayment />} />

              <Route path="/bike" element={<Bike />} />
              <Route path="/bike/book" element={<BikeBook />} />
              <Route path="/bike/rental" element={<BikeRental />} />

              <Route path="/auto" element={<Auto />} />
              <Route path="/auto/book" element={<AutoBook />} />
              <Route path="/auto/rental" element={<AutoRental />} />

              <Route path="/bus" element={<Bus />} />
              <Route path="/bus/book" element={<BusBook />} />
              <Route path="/bus/rental" element={<BusRental />} />
              <Route path="/bus-seat" element={<BusSelectSeat />} />
              <Route path="/bus-confirm" element={<BusConfirm />} />

              {/* ===== LOGIN ===== */}
              <Route path="/loginoptions" element={<LoginOptions />} />
              <Route path="/login/user" element={<UserLogin />} />
              <Route path="/login/admin" element={<AdminLogin />} />
              <Route path="/login/driver" element={<DriverLogin />} />

              {/* ===== USER PROTECTED ===== */}
              <Route path="/account" element={<ProtectRoute><Account /></ProtectRoute>} />
              <Route path="/wallet" element={<ProtectRoute><Wallet /></ProtectRoute>} /> {/* ✅ USER WALLET */}
              <Route path="/book" element={<ProtectRoute><Book /></ProtectRoute>} />
              <Route path="/courier" element={<ProtectRoute><Courier /></ProtectRoute>} />
              <Route path="/courierform" element={<ProtectRoute><CourierForm /></ProtectRoute>} />
              <Route path="/couriertracking" element={<ProtectRoute><CourierTracking /></ProtectRoute>} />
              <Route path="/upipaymentpage" element={<ProtectRoute><UpiPaymentPage /></ProtectRoute>} />
              <Route path="/confirmride1" element={<ProtectRoute><ConfirmRide1 /></ProtectRoute>} />
              <Route path="/history" element={<ProtectRoute><History /></ProtectRoute>} />
              <Route path="/settings" element={<ProtectRoute><Settings /></ProtectRoute>} />
              <Route path="/logout" element={<ProtectRoute><Logout /></ProtectRoute>} />
              <Route path="/update" element={<ProtectRoute><Update /></ProtectRoute>} />

              {/* ===== DRIVER ===== */}
              <Route path="/driver" element={<DriverProtectRoute><DriverLayout /></DriverProtectRoute>}>
                <Route index element={<DriverDashboard />} />
                <Route path="dashboard" element={<DriverDashboard />} />
                <Route path="rides" element={<DriverRides />} />
                <Route path="earnings" element={<DriverEarnings />} />
                <Route path="profile" element={<DriverProfile />} />
                <Route path="live-location" element={<DriverLiveLocation />} />
                <Route path="logout" element={<DriverLogout />} />
              </Route>

              {/* ===== ADMIN ===== */}
              <Route path="/admin" element={<AdminProtectRoute><AdminLayout /></AdminProtectRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="drivers" element={<AdminDrivers />} />
                <Route path="rides" element={<AdminRides />} />
                <Route path="earnings" element={<AdminEarnings />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="logout" element={<AdminLogout />} />
                <Route path="BookingHistory" element={<BookingHistory />} />
              </Route>

              {/* ===== FALLBACK ===== */}
              <Route path="*" element={<Navigate to="/" />} />

            </Routes>

            <Footer />
          </Router>
        </AdminAuthProvider>
      </DriverAuthProvider>
    </AuthProvider>
  );
};

export default App;