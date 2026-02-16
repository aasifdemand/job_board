import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/auth.store";

import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import VerifyAccount from "./pages/auth/verify-account";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import GoogleCallback from "./pages/auth/google-callback";

import AuthLayout from "./layouts/auth.layout";
import SeekerLayout from "./layouts/seeker.layout";
import RecruiterLayout from "./layouts/recruiter.layout";

import SeekerDashboard from "./pages/seeker/dashboard";
import SeekerJobs from "./pages/seeker/jobs";
import SeekerApplications from "./pages/seeker/applications";
import Resume from "./pages/seeker/resume";
import SavedJobs from "./pages/seeker/jobs/saved-jobs";
import Analytics from "./pages/seeker/analytics";
import SeeekerInterviews from "./pages/seeker/interviews";
import Settings from "./pages/seeker/settings";

import RecruiterDashboard from "./pages/recruiter/dashboard";
import RecruiterJobs from "./pages/recruiter/jobs";
import Candidates from "./pages/recruiter/candidates";
import RecruiterApplications from "./pages/recruiter/applications";
import RecruiterAnalytics from "./pages/recruiter/analytics";
import Company from "./pages/recruiter/profile";

import ProtectedRoute from "./pages/protected-route";
import OnboardingPage from "./pages/onboarding/onboarding";

const App = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <Routes>
      {/* ================= DEFAULT ROOT ================= */}
      <Route
        path="/"
        element={
          user ? (
            user.isOnboarded ? (
              user.role === "recruiter" ? (
                <Navigate to="/recruiter" />
              ) : (
                <Navigate to="/seeker" />
              )
            ) : (
              <Navigate to="/onboarding" />
            )
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />

      <Route
        path="/onboarding"
        element={
          user ? (
            !user.isOnboarded ? (
              <OnboardingPage />
            ) : (
              <Navigate to="/" replace />
            )
          ) : (
            <Navigate to="/auth/login" replace />
          )
        }
      />

      {/* ================= AUTH ROUTES ================= */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verify" element={<VerifyAccount />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Google callback should NOT be inside /auth */}
      <Route path="/google/callback" element={<GoogleCallback />} />

      {/* ================= SEEKER ================= */}
      <Route
        path="/seeker"
        element={
          <ProtectedRoute allowedRoles={["job_seeker"]}>
            <SeekerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SeekerDashboard />} />
        <Route path="jobs" element={<SeekerJobs />} />
        <Route path="applications" element={<SeekerApplications />} />
        <Route path="resume" element={<Resume />} />
        <Route path="saved" element={<SavedJobs />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="interviews" element={<SeeekerInterviews />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ================= RECRUITER ================= */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RecruiterDashboard />} />
        <Route path="jobs" element={<RecruiterJobs />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="applications" element={<RecruiterApplications />} />
        <Route path="analytics" element={<RecruiterAnalytics />} />
        <Route path="company" element={<Company />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
