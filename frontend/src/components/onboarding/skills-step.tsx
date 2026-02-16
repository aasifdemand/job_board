/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSeekerStore } from "@/store/seeker.store";

interface JobSeekerSkillsStepProps {
  formData: {
    skills: string[];
    resumeFile: File | null;
  };
  toggleSkill: (skill: string) => void;
  updateFormData: (field: string, value: any) => void;
}

const JobSeekerSkillsStep = ({
  formData,
  toggleSkill,
  updateFormData,
}: JobSeekerSkillsStepProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const skillOptions = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "Kubernetes",
    "UI/UX Design",
    "Project Management",
    "DevOps",
    "Machine Learning",
  ];

  const uploadResume = useSeekerStore((s) => s.uploadResume);

  const handleFileUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      setUploadError("Please upload a PDF file only");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      await uploadResume(file);

      updateFormData("resumeFile", file);

      setIsUploading(false);
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeFile = () => {
    updateFormData("resumeFile", null);
    setUploadError(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Skills & Resume</h2>
        <p className="text-muted-foreground">
          Add your skills and upload your resume
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <Label>Select Your Skills</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {skillOptions.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={formData.skills.includes(skill)}
                  onCheckedChange={() => toggleSkill(skill)}
                />
                <Label
                  htmlFor={skill}
                  className="text-sm cursor-pointer flex-1"
                >
                  {skill}
                </Label>
              </div>
            ))}
          </div>

          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
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
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <Label>Upload Your Resume (Optional)</Label>
          <p className="text-sm text-muted-foreground">
            Upload your resume in PDF format (max 5MB)
          </p>

          {formData.resumeFile ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
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
                      <p className="font-medium text-sm">
                        {formData.resumeFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(formData.resumeFile.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isUploading
                  ? "border-primary/50 bg-primary/5"
                  : "border-gray-300 hover:border-primary hover:bg-primary/5"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() =>
                !isUploading &&
                document.getElementById("resume-upload")?.click()
              }
            >
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />

              {isUploading ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-primary animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Uploading Resume...</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PDF format only • Max 5MB
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("resume-upload")?.click();
                      }}
                    >
                      Browse Files
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {uploadError && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{uploadError}</span>
            </div>
          )}

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
              <div className="space-y-1 text-sm">
                <p className="font-medium">Why upload your resume?</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    Increase your chances of getting noticed by recruiters
                  </li>
                  <li>Apply to jobs with one click</li>
                  <li>We'll parse your skills and experience automatically</li>
                  <li>
                    You can update or remove it anytime in profile settings
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerSkillsStep;
