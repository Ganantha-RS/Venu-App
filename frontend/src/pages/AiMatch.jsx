import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";
import AiMatchUmkm from "./AiMatchUmkm";
import AiMatchSchool from "./AiMatchSchool";

export default function AiMatch() {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-8 text-navy/50">Memuat...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return user.role === "school" ? <AiMatchSchool /> : <AiMatchUmkm />;
}