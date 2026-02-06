import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import VerifyAccount from "./pages/auth/verify-account";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import AuthLayout from "./layouts/auth.layout";
import OnboardingPage from "./pages/onboarding/onboarding";
import SeekerLayout from "./layouts/seeker.layout";
import SeekerDashboard from "./pages/seeker/dashboard";
import RecruiterLayout from "./layouts/recruiter.layout";
import RecruiterDashboard from "./pages/recruiter/dashboard";
import Jobs from "./pages/seeker/jobs";
import Applications from "./pages/seeker/applications";
import Resume from "./pages/seeker/resume";
import SavedJobs from "./pages/seeker/jobs/saved-jobs";

const App = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="verify" element={<VerifyAccount />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="onboarding" element={<OnboardingPage />} />

      <Route path="seeker" element={<SeekerLayout />}>
        <Route index element={<SeekerDashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="applications" element={<Applications />} />
        <Route path="resume" element={<Resume />} />
        <Route path="saved" element={<SavedJobs />} />
      </Route>
      <Route path="recruiter" element={<RecruiterLayout />}>
        <Route index element={<RecruiterDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
