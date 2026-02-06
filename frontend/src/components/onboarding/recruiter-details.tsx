import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RecruiterDetailsStepProps {
  formData: {
    companyName: string;
    companyWebsite: string;
    location: string;
    companyDescription: string;
  };
  updateFormData: (field: string, value: string) => void;
}

const RecruiterDetailsStep = ({
  formData,
  updateFormData,
}: RecruiterDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Company Profile</h2>
        <p className="text-muted-foreground">Tell us about your company</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            placeholder="Acme Inc."
            value={formData.companyName}
            onChange={(e) => updateFormData("companyName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input
            id="companyWebsite"
            placeholder="https://example.com"
            value={formData.companyWebsite}
            onChange={(e) => updateFormData("companyWebsite", e.target.value)}
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
          <Label htmlFor="companyDescription">Company Description</Label>
          <Textarea
            id="companyDescription"
            placeholder="Tell us about your company culture, mission, and values..."
            value={formData.companyDescription}
            onChange={(e) =>
              updateFormData("companyDescription", e.target.value)
            }
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterDetailsStep;
