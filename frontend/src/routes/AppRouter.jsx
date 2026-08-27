import { Route, Routes } from "react-router-dom";
import Landing from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Tambahkan halaman lain di sini seiring fitur AI Match, Event, Tenant
// Management, dan Analytics selesai dikerjakan.
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
