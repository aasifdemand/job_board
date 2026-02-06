import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "../ui/progress";

interface JobSeekerReviewStepProps {
  formData: {
    headline: string;
    summary: string;
    location: string;
    experienceLevel: string;
    skills: string[];
    resumeFile: File | null;
  };
  onEdit: (step: number) => void;
}

const JobSeekerReviewStep = ({
  formData,
  onEdit,
}: JobSeekerReviewStepProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getResumePreviewUrl = (file: File | null) => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  const resumePreviewUrl = getResumePreviewUrl(formData.resumeFile);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Review Your Profile
        </h2>
        <p className="text-muted-foreground">
          Please review all information before completing your profile
        </p>
      </div>

      <ScrollArea className="h-125 pr-4">
        <div className="space-y-6 pb-4">
          {/* Personal Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>Your basic profile details</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(2)}
                className="text-primary hover:text-primary/80"
              >
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Professional Headline
                  </p>
                  <p className="font-medium">
                    {formData.headline || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Experience Level
                  </p>
                  <Badge
                    variant={formData.experienceLevel ? "default" : "outline"}
                    className={
                      formData.experienceLevel
                        ? "bg-primary/10 text-primary"
                        : ""
                    }
                  >
                    {formData.experienceLevel || "Not selected"}
                  </Badge>
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

              {formData.summary && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Professional Summary
                  </p>
                  <p className="text-sm whitespace-pre-line">
                    {formData.summary}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Skills Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-lg">Skills</CardTitle>
                <CardDescription>
                  Your selected technical and soft skills
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(3)}
                className="text-primary hover:text-primary/80"
              >
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              {formData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No skills selected
                </p>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Resume Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-lg">Resume</CardTitle>
                <CardDescription>Your uploaded resume document</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(3)}
                  className="text-primary hover:text-primary/80"
                >
                  {formData.resumeFile ? "Change" : "Add"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {formData.resumeFile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">
                          {formData.resumeFile.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(formData.resumeFile.size)} • PDF
                        </p>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[50vh]">
                        <DialogHeader>
                          <DialogTitle>Resume Preview</DialogTitle>
                        </DialogHeader>
                        <div className="h-full">
                          {resumePreviewUrl && (
                            <iframe
                              src={resumePreviewUrl}
                              className="w-full h-[40vh] rounded-lg border"
                              title="Resume Preview"
                            />
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="flex items-start space-x-3">
                      <svg
                        className="w-5 h-5 text-primary mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="text-sm">
                        <p className="font-medium">Resume Tips:</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-1">
                          <li>
                            Make sure your contact information is up to date
                          </li>
                          <li>
                            Highlight relevant experience for your target roles
                          </li>
                          <li>
                            Include measurable achievements (e.g., "Improved
                            performance by 40%")
                          </li>
                          <li>
                            Keep it concise - recruiters typically spend 6-7
                            seconds on initial review
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed rounded-lg">
                  <svg
                    className="w-12 h-12 text-muted-foreground mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-muted-foreground mb-2">
                    No resume uploaded
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a resume to increase your job application success
                    rate
                  </p>
                  <Button variant="outline" size="sm" onClick={() => onEdit(3)}>
                    Upload Resume
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Completeness Card */}
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Profile Completeness</CardTitle>
              <CardDescription>
                A complete profile increases your chances of getting hired
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Profile Strength</span>
                    <span className="font-bold text-primary">
                      {(() => {
                        let score = 0;
                        if (formData.headline) score += 20;
                        if (formData.experienceLevel) score += 15;
                        if (formData.location) score += 10;
                        if (formData.summary) score += 15;
                        if (formData.skills.length > 0) score += 20;
                        if (formData.resumeFile) score += 20;
                        return score;
                      })()}
                      %
                    </span>
                  </div>
                  <Progress
                    value={(() => {
                      let score = 0;
                      if (formData.headline) score += 20;
                      if (formData.experienceLevel) score += 15;
                      if (formData.location) score += 10;
                      if (formData.summary) score += 15;
                      if (formData.skills.length > 0) score += 20;
                      if (formData.resumeFile) score += 20;
                      return score;
                    })()}
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${formData.headline ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span
                      className={
                        formData.headline ? "" : "text-muted-foreground"
                      }
                    >
                      Professional Headline
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${formData.experienceLevel ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span
                      className={
                        formData.experienceLevel ? "" : "text-muted-foreground"
                      }
                    >
                      Experience Level
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${formData.location ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span
                      className={
                        formData.location ? "" : "text-muted-foreground"
                      }
                    >
                      Location
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${formData.summary ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span
                      className={
                        formData.summary ? "" : "text-muted-foreground"
                      }
                    >
                      Professional Summary
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${formData.skills.length > 0 ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span
                      className={
                        formData.skills.length > 0
                          ? ""
                          : "text-muted-foreground"
                      }
                    >
                      Skills Added ({formData.skills.length})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${formData.resumeFile ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span
                      className={
                        formData.resumeFile ? "" : "text-muted-foreground"
                      }
                    >
                      Resume Uploaded
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

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
              <li>Your profile will be visible to recruiters and companies</li>
              <li>
                You can update any information later in your profile settings
              </li>
              <li>
                Make sure your resume is up-to-date and includes relevant
                keywords
              </li>
              <li>Complete profiles get 3x more views from recruiters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerReviewStep;
