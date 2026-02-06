import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface JobSeekerDetailsStepProps {
  formData: {
    headline: string;
    summary: string;
    location: string;
    experienceLevel: string;
  };
  updateFormData: (field: string, value: string) => void;
}

const JobSeekerDetailsStep = ({
  formData,
  updateFormData,
}: JobSeekerDetailsStepProps) => {
  const experienceLevels = [
    { value: "Junior", label: "Junior (0-2 years)" },
    { value: "Mid", label: "Mid (3-5 years)" },
    { value: "Senior", label: "Senior (6+ years)" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Job Seeker Profile
        </h2>
        <p className="text-muted-foreground">
          Tell us about your professional background
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="headline">Professional Headline *</Label>
          <Input
            id="headline"
            placeholder="e.g. Frontend Developer | React | TypeScript"
            value={formData.headline}
            onChange={(e) => updateFormData("headline", e.target.value)}
            required
          />
          <p className="text-sm text-muted-foreground">
            A brief title that describes your expertise
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            placeholder="Describe your experience, skills, and career goals..."
            value={formData.summary}
            onChange={(e) => updateFormData("summary", e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, Country"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Label>Experience Level</Label>
          <RadioGroup
            value={formData.experienceLevel}
            onValueChange={(value) => updateFormData("experienceLevel", value)}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {experienceLevels.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <RadioGroupItem value={level.value} id={level.value} />
                <Label htmlFor={level.value} className="cursor-pointer">
                  {level.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDetailsStep;
