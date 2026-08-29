// src/routes/AppRouter.jsx
import { Route, Routes } from "react-router-dom";

import Landing from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

import SchoolHome from "../pages/school/SchoolHome";
import UmkmHome from "../pages/umkm/UmkmHome";

import ProtectedRoute from "./ProtectedRoute";
import AiMatchIntro from "../pages/ai-match/AiMatchIntro";
import AiMatchSchool from "../pages/AiMatchSchool";
import AiMatchUmkm from "../pages/AiMatchUmkm";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* School */}
      <Route element={<ProtectedRoute allowedRole="school" />}>
        <Route path="/school" element={<SchoolHome />} />
        <Route path="/school/ai-match" element={<AiMatchIntro role="school" />} />
        <Route path="/school/ai-match/hasil" element={<AiMatchSchool />} />
      </Route>

      {/* UMKM */}
      <Route element={<ProtectedRoute allowedRole="umkm" />}>
        <Route path="/umkm" element={<UmkmHome />} />
        <Route path="/umkm/ai-match" element={<AiMatchIntro role="umkm" />} />
        <Route path="/umkm/ai-match/hasil" element={<AiMatchUmkm />} />
      </Route>
    </Routes>
  );
}