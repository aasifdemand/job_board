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
import SeekerJobs from "./pages/seeker/jobs";
import SeekerApplications from "./pages/seeker/applications";
import Resume from "./pages/seeker/resume";
import SavedJobs from "./pages/seeker/jobs/saved-jobs";
import Analytics from "./pages/seeker/analytics";
import SeeekerInterviews from "./pages/seeker/interviews";
import Settings from "./pages/seeker/settings";
import RecruiterJobs from "./pages/recruiter/jobs/index";
import Candidates from "./pages/recruiter/candidates";
import RecruiterInterviews from "./pages/seeker/interviews";
import Company from "./pages/recruiter/profile";
import RecruiterApplications from "./pages/recruiter/applications";
import RecruiterAnalytics from "./pages/recruiter/analytics";
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
        <Route path="jobs" element={<SeekerJobs />} />
        <Route path="applications" element={<SeekerApplications />} />
        <Route path="resume" element={<Resume />} />
        <Route path="saved" element={<SavedJobs />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="interviews" element={<SeeekerInterviews />} />
        <Route path="Settings" element={<Settings />} />
      </Route>
      <Route path="recruiter" element={<RecruiterLayout />}>
        <Route index element={<RecruiterDashboard />} />
        <Route path="jobs" element={<RecruiterJobs />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="interviews" element={<RecruiterInterviews />} />
        <Route path="company" element={<Company />} />
        <Route path="applications" element={<RecruiterApplications />} />
        <Route path="analytics" element={<RecruiterAnalytics />} />
      </Route>
    </Routes>
  );
};

export default App;
