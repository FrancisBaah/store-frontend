import { Route, Routes } from "react-router";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import AuthPage from "./components/Authpage";
import Shopping from "./components/USER/Shopping";
import Success from "./components/Checkout/Success";
import Canceled from "./components/Checkout/Canceled";
import Checkout from "./components/Checkout/Checkout";
import AuthProvider from "./components/AuthProvider";
import AdminProductPage from "./components/ADMIN/AdminProductPage";
import UserManagement from "./components/ADMIN/UserManagement";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/Shopping" element={<Shopping />} />
          <Route path="/success" element={<Success />} />
          <Route path="/canceled" element={<Canceled />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/listing" element={<AdminProductPage />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
