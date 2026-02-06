import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface RecruiterReviewStepProps {
  formData: {
    companyName: string;
    companyWebsite: string;
    location: string;
    companyDescription: string;
  };
  userType: "jobSeeker" | "recruiter" | null;
}

const RecruiterReviewStep = ({ formData }: RecruiterReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Review Company Profile
        </h2>
        <p className="text-muted-foreground">
          Please review all information before completing your company profile
        </p>
      </div>

      <div className="space-y-6">
        {/* Company Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Company Information</CardTitle>
            <CardDescription>Your company profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Company Name
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
                  {formData.companyWebsite ? (
                    <a
                      href={
                        formData.companyWebsite.startsWith("http")
                          ? formData.companyWebsite
                          : `https://${formData.companyWebsite}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {formData.companyWebsite}
                    </a>
                  ) : (
                    "Not provided"
                  )}
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
                <Separator className="my-4" />
                <p className="text-sm font-medium text-muted-foreground">
                  Company Description
                </p>
                <p className="text-sm whitespace-pre-line bg-muted/50 p-4 rounded-lg mt-2">
                  {formData.companyDescription}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card className="bg-primary/5 border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg">Next Steps After Setup</CardTitle>
            <CardDescription>
              Here's what you can do after completing your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium">Post Your First Job</p>
                  <p className="text-sm text-muted-foreground">
                    Create detailed job listings with requirements, benefits,
                    and application process
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium">Browse Talent Pool</p>
                  <p className="text-sm text-muted-foreground">
                    Search for qualified candidates based on skills, experience,
                    and location
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium">Manage Applications</p>
                  <p className="text-sm text-muted-foreground">
                    Review applications, schedule interviews, and communicate
                    with candidates
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Completeness */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Completeness</CardTitle>
            <CardDescription>Your current profile strength</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Profile Strength</span>
                <Badge className="bg-primary text-primary-foreground">
                  {(() => {
                    let score = 0;
                    if (formData.companyName) score += 40;
                    if (formData.companyWebsite) score += 20;
                    if (formData.location) score += 20;
                    if (formData.companyDescription) score += 20;
                    return score;
                  })()}
                  %
                </Badge>
              </div>

              <div className="space-y-2">
                {[
                  {
                    label: "Company Name",
                    completed: !!formData.companyName,
                    weight: 40,
                  },
                  {
                    label: "Company Website",
                    completed: !!formData.companyWebsite,
                    weight: 20,
                  },
                  {
                    label: "Location",
                    completed: !!formData.location,
                    weight: 20,
                  },
                  {
                    label: "Company Description",
                    completed: !!formData.companyDescription,
                    weight: 20,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${item.completed ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span
                        className={`text-sm ${item.completed ? "" : "text-muted-foreground"}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{item.weight}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-yellow-600 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Important Notes:</p>
              <ul className="list-disc list-inside text-yellow-700 space-y-1 mt-1">
                <li>Your company profile will be visible to job seekers</li>
                <li>You can update company information anytime in settings</li>
                <li>Complete profiles attract 60% more qualified candidates</li>
                <li>
                  Company verification may require additional documentation
                </li>
                <li>
                  You'll be able to post jobs immediately after completing this
                  setup
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterReviewStep;
