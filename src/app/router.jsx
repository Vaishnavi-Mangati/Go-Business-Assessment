import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ReferralDetailPage from "../features/referral/pages/ReferralDetailPage";
import NotFoundPage from "../shared/pages/NotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/referral/:id" element={<ReferralDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}