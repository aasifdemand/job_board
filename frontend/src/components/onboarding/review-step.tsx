import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ReviewStepProps {
  formData: {
    companyName: string;
    companyWebsite: string;
    location: string;
    companyDescription: string;
  };
  userType: "jobSeeker" | "recruiter" | null;
}

const ReviewStep = ({ formData, userType }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {userType === "jobSeeker"
            ? "Review Your Profile"
            : "Review Company Profile"}
        </h2>
        <p className="text-muted-foreground">
          Please review all the information before completing
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            {userType === "jobSeeker"
              ? "Your professional profile details"
              : "Your company profile details"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {userType === "jobSeeker"
                  ? "Professional Headline"
                  : "Company Name"}
              </p>
              <p className="font-medium">
                {formData.companyName || "Not provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Website
              </p>
              <p className="font-medium">
                {formData.companyWebsite || "Not provided"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Location
              </p>
              <p className="font-medium">
                {formData.location || "Not provided"}
              </p>
            </div>
          </div>

          {formData.companyDescription && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {userType === "jobSeeker"
                  ? "Professional Summary"
                  : "Description"}
              </p>
              <p className="text-sm">{formData.companyDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;
