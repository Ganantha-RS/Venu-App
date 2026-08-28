import { Route, Routes } from "react-router-dom";
import Landing from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AiMatch from "../pages/AiMatch";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ai-match" element={<AiMatch />} />
    </Routes>
  );
}