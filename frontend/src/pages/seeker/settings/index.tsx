import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Eye,
  Lock,
  Download,
  Trash2,
  Key,
  Palette,
  Smartphone,
  X,
  Save,
  Upload,
  Check,
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
import { Progress } from "@/components/ui/progress";
import { ToggleTheme } from "@/components/shared/toggle-theme";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    bio: "Passionate about building modern web applications with React and TypeScript.",
    avatar: "/avatar.jpg",
    skills: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS"],
    resumeUrl: "/resume.pdf",
    profileCompletion: 85,
  };

  const notificationSettings = [
    {
      id: "new_jobs",
      label: "New job matches",
      description: "Get notified when new jobs match your profile",
      enabled: true,
    },
    {
      id: "application_updates",
      label: "Application updates",
      description: "Updates on your job applications",
      enabled: true,
    },
    {
      id: "interview_reminders",
      label: "Interview reminders",
      description: "Reminders for upcoming interviews",
      enabled: true,
    },
    {
      id: "deadline_alerts",
      label: "Deadline alerts",
      description: "Alerts for application deadlines",
      enabled: false,
    },
    {
      id: "company_news",
      label: "Company news",
      description: "News from companies you follow",
      enabled: true,
    },
    {
      id: "weekly_summary",
      label: "Weekly summary",
      description: "Weekly job search summary email",
      enabled: true,
    },
  ];

  const privacySettings = [
    {
      id: "profile_visibility",
      label: "Profile Visibility",
      description: "Who can see your profile",
      value: "public",
    },
    {
      id: "resume_visibility",
      label: "Resume Visibility",
      description: "Who can see your resume",
      value: "recruiters",
    },
    {
      id: "contact_info",
      label: "Contact Information",
      description: "Who can see your contact info",
      value: "private",
    },
    {
      id: "activity_status",
      label: "Activity Status",
      description: "Show when you're active",
      value: "enabled",
    },
    {
      id: "data_sharing",
      label: "Data Sharing",
      description: "Share anonymous usage data",
      value: "enabled",
    },
  ];

  const exportOptions = [
    {
      label: "Application History",
      description: "Export all your job applications",
      format: "CSV",
    },
    {
      label: "Saved Jobs",
      description: "Export your saved job listings",
      format: "JSON",
    },
    {
      label: "Interview History",
      description: "Export your interview records",
      format: "PDF",
    },
    {
      label: "Profile Data",
      description: "Export your complete profile",
      format: "JSON",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <Check className="h-3 w-3" />
            Auto-save enabled
          </Badge>
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={
                    activeTab === "notifications" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "privacy" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab("privacy")}
                >
                  <Shield className="h-4 w-4" />
                  Privacy & Security
                </Button>
                <Button
                  variant={activeTab === "appearance" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab("appearance")}
                >
                  <Palette className="h-4 w-4" />
                  Appearance
                </Button>
                <Button
                  variant={activeTab === "data" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab("data")}
                >
                  <Download className="h-4 w-4" />
                  Data & Export
                </Button>
                <Separator className="my-2" />
                <Button
                  variant={activeTab === "account" ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                  onClick={() => setActiveTab("account")}
                >
                  <Trash2 className="h-4 w-4" />
                  Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Profile Completion</h3>
                  <Badge>{userProfile.profileCompletion}%</Badge>
                </div>
                <Progress
                  value={userProfile.profileCompletion}
                  className="h-2"
                />
                <p className="text-sm text-muted-foreground">
                  Complete your profile to get better job matches
                </p>
                <Button variant="outline" className="w-full gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and job preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="space-y-3">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={userProfile.avatar} />
                        <AvatarFallback className="text-lg">JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="h-3 w-3" />
                        Change Photo
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={userProfile.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue={userProfile.email}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input id="title" defaultValue={userProfile.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          defaultValue={userProfile.location}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          defaultValue={userProfile.bio}
                          className="min-h-25"
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
                          Add or remove skills to improve job matches
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Add Skill
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="gap-1 px-3 py-1"
                        >
                          {skill}
                          <button className="hover:bg-muted rounded-full p-0.5">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
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
                            resume.pdf • Updated 2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          Replace
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Choose how you want to be notified about job opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications on your devices
                        </p>
                      </div>
                      <Switch
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Job Alert Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Daily or weekly job alerts based on your preferences
                        </p>
                      </div>
                      <Switch
                        checked={jobAlerts}
                        onCheckedChange={setJobAlerts}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-save Preferences</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically save your settings
                        </p>
                      </div>
                      <Switch
                        checked={autoSave}
                        onCheckedChange={setAutoSave}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Notification Types</h4>
                    {notificationSettings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <Label className="font-normal">{setting.label}</Label>
                          <p className="text-sm text-muted-foreground">
                            {setting.description}
                          </p>
                        </div>
                        <Switch defaultChecked={setting.enabled} />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Notification Frequency</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Job Alerts</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">
                              Weekly Summary
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Application Updates</Label>
                        <Select defaultValue="realtime">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Quiet Hours</Label>
                        <Select defaultValue="disabled">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="disabled">Disabled</SelectItem>
                            <SelectItem value="night">10 PM - 7 AM</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Privacy & Security Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage your privacy settings and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Privacy Settings</h4>
                    {privacySettings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <Label className="font-normal">{setting.label}</Label>
                          <p className="text-sm text-muted-foreground">
                            {setting.description}
                          </p>
                        </div>
                        <Select defaultValue={setting.value}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="recruiters">
                              Recruiters Only
                            </SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Security</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="font-normal">
                            Two-Factor Authentication
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Key className="h-4 w-4" />
                          Enable 2FA
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="font-normal">Password</Label>
                          <p className="text-sm text-muted-foreground">
                            Last changed 30 days ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Lock className="h-4 w-4" />
                          Change Password
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="font-normal">Login Activity</Label>
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
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Connected Devices</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">iPhone 14 Pro</p>
                            <p className="text-sm text-muted-foreground">
                              San Francisco • Current session
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">MacBook Pro</p>
                            <p className="text-sm text-muted-foreground">
                              Last active 2 days ago
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the dashboard looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="font-normal">Theme</Label>
                        <p className="text-sm text-muted-foreground">
                          Choose between light and dark mode
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <ToggleTheme />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="font-normal">Language</Label>
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
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="font-normal">Time Zone</Label>
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
                          <SelectItem value="cet">CET (UTC+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="font-normal">Density</Label>
                        <p className="text-sm text-muted-foreground">
                          Adjust the spacing and size of elements
                        </p>
                      </div>
                      <Select defaultValue="comfortable">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="comfortable">
                            Comfortable
                          </SelectItem>
                          <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Display Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Default View</Label>
                        <Select defaultValue="dashboard">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dashboard">Dashboard</SelectItem>
                            <SelectItem value="jobs">Job Search</SelectItem>
                            <SelectItem value="applications">
                              Applications
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Results Per Page</Label>
                        <Select defaultValue="25">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 items</SelectItem>
                            <SelectItem value="25">25 items</SelectItem>
                            <SelectItem value="50">50 items</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Data & Export Tab */}
          {activeTab === "data" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data & Export</CardTitle>
                  <CardDescription>
                    Export your data or manage data retention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Export Your Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Download a copy of your data for backup or transfer
                    </p>
                    <div className="space-y-3">
                      {exportOptions.map((option) => (
                        <div
                          key={option.label}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{option.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{option.format}</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <Download className="h-3 w-3" />
                              Export
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="font-normal">Export All Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Download a complete archive of your account data
                        </p>
                      </div>
                      <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Export All Data
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-600">
                      Data Management
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="font-normal">
                            Delete Application History
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your job application history
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200"
                        >
                          Delete History
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="font-normal">
                            Clear Saved Jobs
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Remove all saved job listings
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200"
                        >
                          Clear Saved
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">
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
                          <li>Analytics data and preferences</li>
                          <li>Connected accounts and integrations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Before you go...</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="font-normal">
                            Export Your Data
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Download all your data before deletion
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Export All Data
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="font-normal">
                            Temporary Deactivation
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Temporarily disable your account instead
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Deactivate Account
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="confirm" className="text-red-600">
                        Type "DELETE" to confirm
                      </Label>
                      <Input
                        id="confirm"
                        placeholder="Type DELETE to confirm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="understand"
                        className="rounded"
                      />
                      <Label htmlFor="understand" className="text-sm">
                        I understand that this action cannot be undone
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Account Permanently
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
