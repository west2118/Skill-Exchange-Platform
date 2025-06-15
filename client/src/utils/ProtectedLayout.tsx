import { Loading } from "@/components/app/Loading";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (user === undefined) {
    return <Loading />;
  }

  if (!user && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
