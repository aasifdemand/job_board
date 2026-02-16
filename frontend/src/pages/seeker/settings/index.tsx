/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  User,
  Shield,
  Lock,
  Eye,
  Download,
  Trash2,
  Key,
  Palette,
  Save,
  Upload,
  X,
  Moon,
  Sun,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";
import { useSeekerStore } from "@/store/seeker.store";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { profile, fetchProfile, updateProfile, uploadResume, loading } =
    useSeekerStore();

  // Profile state
  const [formData, setFormData] = useState({
    headline: "",
    summary: "",
    location: "",
    experienceLevel: "",
    skills: [] as string[],
  });

  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [understandChecked, setUnderstandChecked] = useState(false);

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    resumeVisibility: "recruiters",
    contactInfo: "private",
    activityStatus: "enabled",
    dataSharing: "enabled",
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    jobAlerts: true,
    applicationUpdates: true,
    interviewReminders: true,
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await fetchProfile();
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    loadProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        headline: profile.headline || "",
        summary: profile.summary || "",
        location: profile.location || "",
        experienceLevel: profile.experienceLevel || "",
        skills: profile.skills || [],
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        headline: formData.headline,
        summary: formData.summary,
        location: formData.location,
        experienceLevel: formData.experienceLevel,
        skills: formData.skills,
      });

      setIsEditing(false);
      toast("Your changes have been saved successfully.");
    } catch (error: any) {
      toast("There was an error saving your changes.");
      console.log(error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast("Please upload a PDF file only");
    }

    if (file.size > 5 * 1024 * 1024) {
      toast("File size must be less than 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      await uploadResume(file);
      toast("Your resume has been uploaded successfully.");
    } catch (error: any) {
      toast("There was an error uploading your resume.");
      console.log("error: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
    setIsEditing(true);
  };

  const getInitials = () => {
    if (!profile?.headline) return "U";
    return profile.headline
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm === "DELETE" && understandChecked) {
      // TODO: Implement account deletion
      toast("Your account deletion has been initiated.");
    }
  };

  return (
    <div className=" mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your profile and preferences
          </p>
        </div>
        {isEditing && (
          <Button
            onClick={handleSaveProfile}
            disabled={loading}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and professional details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.resumeUrl} />
                <AvatarFallback className="text-lg">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" disabled>
                  <Upload className="h-3 w-3" />
                  Change Photo
                </Button>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    value={formData.headline}
                    onChange={(e) =>
                      handleInputChange("headline", e.target.value)
                    }
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value) =>
                    handleInputChange("experienceLevel", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior">Junior (0-2 years)</SelectItem>
                    <SelectItem value="Mid">Mid (3-5 years)</SelectItem>
                    <SelectItem value="Senior">Senior (6+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  placeholder="Tell us about your experience and career goals..."
                  className="min-h-25"
                  rows={4}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Skills</h4>
                <p className="text-sm text-muted-foreground">
                  Your technical and professional skills
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.length > 0 ? (
                formData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="gap-1 px-3 py-1"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No skills added</p>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Resume</h4>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Download className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Current Resume</p>
                  <p className="text-sm text-muted-foreground">
                    {profile?.resumeUrl ? "resume.pdf" : "No resume uploaded"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {profile?.resumeUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(profile.resumeUrl, "_blank")}
                  >
                    Download
                  </Button>
                )}
                <div>
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("resume-upload")?.click()
                    }
                    disabled={isUploading}
                  >
                    {isUploading
                      ? "Uploading..."
                      : profile?.resumeUrl
                        ? "Replace"
                        : "Upload"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how the application looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark mode
              </p>
            </div>
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              <Button
                variant={theme === "light" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTheme("light")}
                className="gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTheme("system")}
                className="gap-2"
              >
                <Globe className="h-4 w-4" />
                System
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Language</Label>
              <p className="text-sm text-muted-foreground">
                Choose your preferred language
              </p>
            </div>
            <Select defaultValue="en">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Time Zone</Label>
              <p className="text-sm text-muted-foreground">
                Set your local time zone
              </p>
            </div>
            <Select defaultValue="pst">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="est">EST (UTC-5)</SelectItem>
                <SelectItem value="pst">PST (UTC-8)</SelectItem>
                <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your privacy settings and account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Privacy Settings</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  Who can see your profile
                </p>
              </div>
              <Select
                value={privacySettings.profileVisibility}
                onValueChange={(value) =>
                  setPrivacySettings((prev) => ({
                    ...prev,
                    profileVisibility: value,
                  }))
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="recruiters">Recruiters Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Resume Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  Who can see your resume
                </p>
              </div>
              <Select
                value={privacySettings.resumeVisibility}
                onValueChange={(value) =>
                  setPrivacySettings((prev) => ({
                    ...prev,
                    resumeVisibility: value,
                  }))
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="recruiters">Recruiters Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Security</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Key className="h-4 w-4" />
                Enable 2FA
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Password</Label>
                <p className="text-sm text-muted-foreground">
                  Change your password
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Lock className="h-4 w-4" />
                Change Password
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Login Activity</Label>
                <p className="text-sm text-muted-foreground">
                  Review recent account activity
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                View Activity
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Notification Preferences</h4>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    emailNotifications: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Job Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new job matches
                </p>
              </div>
              <Switch
                checked={notificationSettings.jobAlerts}
                onCheckedChange={(checked) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    jobAlerts: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Application Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Updates on your job applications
                </p>
              </div>
              <Switch
                checked={notificationSettings.applicationUpdates}
                onCheckedChange={(checked) =>
                  setNotificationSettings((prev) => ({
                    ...prev,
                    applicationUpdates: checked,
                  }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Section */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Account Management
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-semibold text-red-700">
                  Warning: This action is irreversible
                </h4>
                <p className="text-sm text-red-600">
                  Deleting your account will permanently remove:
                </p>
                <ul className="text-sm text-red-600 space-y-1 list-disc pl-4">
                  <li>Your profile and personal information</li>
                  <li>All saved job listings and applications</li>
                  <li>Interview history and notes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Export Your Data</Label>
                <p className="text-sm text-muted-foreground">
                  Download a copy of your data
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export All Data
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-red-600">
                Type "DELETE" to confirm
              </Label>
              <Input
                id="confirm"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="border-red-200 focus:border-red-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="understand"
                checked={understandChecked}
                onChange={(e) => setUnderstandChecked(e.target.checked)}
                className="rounded border-red-300"
              />
              <Label htmlFor="understand" className="text-sm">
                I understand that this action cannot be undone
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={deleteConfirm !== "DELETE" || !understandChecked}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account Permanently
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
