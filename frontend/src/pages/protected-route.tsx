import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

interface Props {
  children: React.ReactNode;
  allowedRoles: ("job_seeker" | "recruiter" | "admin")[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
