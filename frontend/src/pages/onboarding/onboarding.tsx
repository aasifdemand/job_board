import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import UserTypeStep from "@/components/onboarding/usertype-step";
import JobSeekerDetailsStep from "@/components/onboarding/jobseeker-details";
import JobSeekerSkillsStep from "@/components/onboarding/skills-step";
import RecruiterReviewStep from "@/components/onboarding/recruiter-details";
import JobSeekerReviewStep from "@/components/onboarding/jobseeker-review";
import RecruiterDetailsStep from "@/components/onboarding/recruiter-details";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<"jobSeeker" | "recruiter" | null>(
    null,
  );
  const [formData, setFormData] = useState({
    // Job Seeker fields
    headline: "",
    summary: "",
    location: "",
    experienceLevel: "",
    skills: [] as string[],
    resumeFile: null as File | null,

    // Recruiter fields
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
  });

  // Calculate total steps based on user type
  const totalSteps = userType === "jobSeeker" ? 4 : 3;

  const stepTitles = {
    1: "Select your role",
    2: userType === "jobSeeker" ? "Professional details" : "Company details",
    3: userType === "jobSeeker" ? "Skills & resume" : "Review & complete",
    4: "Review & complete", // Only for job seekers
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const payload =
        userType === "jobSeeker"
          ? {
              headline: formData.headline,
              summary: formData.summary,
              location: formData.location,
              experienceLevel: formData.experienceLevel,
              skills: formData.skills,
              resumeUrl: formData.resumeFile,
            }
          : {
              name: formData.companyName,
              website: formData.companyWebsite,
              location: formData.location,
              description: formData.companyDescription,
            };

      console.log("Submitting:", { userType, ...payload });
      // TODO: API call
      // await api.post(`/onboarding/${userType}`, payload);

      navigate("/dashboard");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!userType;
      case 2:
        if (userType === "jobSeeker") {
          return !!formData.headline;
        } else {
          return !!formData.companyName;
        }
      case 3:
        if (userType === "jobSeeker") {
          // Skills step is optional
          return true;
        } else {
          // Recruiter review step is always valid
          return true;
        }
      case 4:
        // Job seeker review step is always valid
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Logo />

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="space-y-2">
            <CardTitle className="text-center">
              Complete Your Profile - Step {step} of {totalSteps}
            </CardTitle>
            <CardDescription className="text-center">
              {stepTitles[step as keyof typeof stepTitles]}
            </CardDescription>
          </div>
          <Progress value={(step / totalSteps) * 100} className="mt-4" />
        </CardHeader>

        <CardContent className="min-h-100">
          {step === 1 && (
            <UserTypeStep userType={userType} setUserType={setUserType} />
          )}

          {step === 2 && userType === "jobSeeker" && (
            <JobSeekerDetailsStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 2 && userType === "recruiter" && (
            <RecruiterDetailsStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 3 && userType === "jobSeeker" && (
            <JobSeekerSkillsStep
              formData={formData}
              toggleSkill={toggleSkill}
              updateFormData={updateFormData}
            />
          )}

          {step === 3 && userType === "recruiter" && (
            <RecruiterReviewStep
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {step === 4 && userType === "jobSeeker" && (
            <JobSeekerReviewStep formData={formData} onEdit={setStep} />
          )}
        </CardContent>

        <CardContent className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>

          {step < totalSteps ? (
            <Button onClick={handleNext} disabled={!isStepValid()}>
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Complete Profile</Button>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Need help?{" "}
          <a href="#" className="text-primary hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;
