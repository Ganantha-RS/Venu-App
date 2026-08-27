import { Route, Routes } from "react-router-dom";

import Landing from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

import SchoolHome from "../pages/school/SchoolHome";
import UmkmHome from "../pages/umkm/UmkmHome";

import ProtectedRoute from "./ProtectedRoute";

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
      </Route>

      {/* UMKM */}
      <Route element={<ProtectedRoute allowedRole="umkm" />}>
        <Route path="/umkm" element={<UmkmHome />} />
      </Route>
    </Routes>
  );
}