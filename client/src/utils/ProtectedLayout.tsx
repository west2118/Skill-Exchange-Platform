import { Loading } from "@/components/app/Loading";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (user === undefined || loading) {
    return <Loading />;
  }

  if (!user) return <Navigate to="/login" replace />;

  const hasLocation = user.location && user.location.zip;
  const hasOfferedSkills = user.offeredSkills && user.offeredSkills.length > 0;
  const isOnboarded = hasLocation || hasOfferedSkills;

  if (!isOnboarded && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  if (isOnboarded && location.pathname === "/onboarding") {
    return <Navigate to="/dashboard?tab=nearby" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
