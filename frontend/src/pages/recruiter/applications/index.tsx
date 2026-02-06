import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Star,
  Eye,
  MessageSquare,
  XCircle,
  MoreVertical,
  ChevronRight,
  Users,
  BarChart3,
  Send,
  Archive,
  ThumbsUp,
  ThumbsDown,
  UserCheck,
  Tag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Application {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  appliedDate: string;
  lastActivity: string;
  status:
    | "new"
    | "reviewed"
    | "shortlisted"
    | "interview"
    | "rejected"
    | "hired";
  source: "LinkedIn" | "Company Website" | "Referral" | "Indeed" | "Other";
  experience: string;
  education: string;
  matchScore: number;
  notes?: string;
  resumeUrl: string;
  isStarred: boolean;
  tags: string[];
}

const RecruiterApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      candidateName: "Alex Johnson",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      email: "alex.johnson@email.com",
      phone: "(555) 123-4567",
      position: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      appliedDate: "2024-01-15",
      lastActivity: "2 hours ago",
      status: "new",
      source: "LinkedIn",
      experience: "5 years",
      education: "MS Computer Science",
      matchScore: 92,
      notes:
        "Strong React and TypeScript experience. Previously worked at Google.",
      resumeUrl: "#",
      isStarred: true,
      tags: ["React", "TypeScript", "UI/UX"],
    },
    {
      id: "2",
      candidateName: "Maria Garcia",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      email: "maria.garcia@email.com",
      phone: "(555) 234-5678",
      position: "Product Manager",
      department: "Product",
      location: "San Francisco",
      appliedDate: "2024-01-14",
      lastActivity: "1 day ago",
      status: "reviewed",
      source: "Company Website",
      experience: "7 years",
      education: "MBA",
      matchScore: 88,
      resumeUrl: "#",
      isStarred: false,
      tags: ["Product Strategy", "Agile", "User Research"],
    },
    {
      id: "3",
      candidateName: "David Chen",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      email: "david.chen@email.com",
      phone: "(555) 345-6789",
      position: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
      appliedDate: "2024-01-16",
      lastActivity: "Just now",
      status: "shortlisted",
      source: "Referral",
      experience: "4 years",
      education: "BS Computer Engineering",
      matchScore: 95,
      notes: "Excellent Python and Django skills. Open source contributor.",
      resumeUrl: "#",
      isStarred: true,
      tags: ["Python", "Django", "AWS"],
    },
    {
      id: "4",
      candidateName: "Emma Wilson",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      email: "emma.wilson@email.com",
      phone: "(555) 456-7890",
      position: "UX Designer",
      department: "Design",
      location: "New York",
      appliedDate: "2024-01-13",
      lastActivity: "3 days ago",
      status: "interview",
      source: "LinkedIn",
      experience: "6 years",
      education: "MFA Design",
      matchScore: 85,
      resumeUrl: "#",
      isStarred: false,
      tags: ["Figma", "User Testing", "Prototyping"],
    },
    {
      id: "5",
      candidateName: "Ryan Miller",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
      email: "ryan.miller@email.com",
      phone: "(555) 567-8901",
      position: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      appliedDate: "2024-01-17",
      lastActivity: "5 hours ago",
      status: "rejected",
      source: "Indeed",
      experience: "3 years",
      education: "BS IT",
      matchScore: 72,
      resumeUrl: "#",
      isStarred: false,
      tags: ["Kubernetes", "Docker", "CI/CD"],
    },
    {
      id: "6",
      candidateName: "Sophia Lee",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
      email: "sophia.lee@email.com",
      phone: "(555) 678-9012",
      position: "Data Scientist",
      department: "Data Science",
      location: "Remote",
      appliedDate: "2024-01-12",
      lastActivity: "1 week ago",
      status: "hired",
      source: "Company Website",
      experience: "8 years",
      education: "PhD Statistics",
      matchScore: 98,
      notes: "Hired for Senior Data Scientist role. Starting next month.",
      resumeUrl: "#",
      isStarred: true,
      tags: ["Machine Learning", "Python", "SQL"],
    },
  ]);

  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    [],
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const stats = {
    total: applications.length,
    new: applications.filter((a) => a.status === "new").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    interview: applications.filter((a) => a.status === "interview").length,
    hired: applications.filter((a) => a.status === "hired").length,
    averageMatchScore: Math.round(
      applications.reduce((acc, app) => acc + app.matchScore, 0) /
        applications.length,
    ),
  };

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesSource = sourceFilter === "all" || app.source === sourceFilter;
    const matchesSearch =
      searchQuery === "" ||
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSource && matchesSearch;
  });

  const getStatusBadge = (status: Application["status"]) => {
    const variants = {
      new: {
        label: "New",
        class: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      },
      reviewed: {
        label: "Reviewed",
        class: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      },
      shortlisted: {
        label: "Shortlisted",
        class: "bg-green-100 text-green-800 hover:bg-green-100",
      },
      interview: {
        label: "Interview",
        class: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      },
      rejected: {
        label: "Rejected",
        class: "bg-red-100 text-red-800 hover:bg-red-100",
      },
      hired: {
        label: "Hired",
        class: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
      },
    };

    return (
      <Badge className={variants[status].class}>{variants[status].label}</Badge>
    );
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600";
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map((app) => app.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, id]);
    } else {
      setSelectedApplications(
        selectedApplications.filter((appId) => appId !== id),
      );
    }
  };

  const handleStarToggle = (id: string) => {
    setApplications((apps) =>
      apps.map((app) =>
        app.id === id ? { ...app, isStarred: !app.isStarred } : app,
      ),
    );
  };

  const handleStatusChange = (id: string, newStatus: Application["status"]) => {
    setApplications((apps) =>
      apps.map((app) => (app.id === id ? { ...app, status: newStatus } : app)),
    );
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case "shortlist":
        setApplications((apps) =>
          apps.map((app) =>
            selectedApplications.includes(app.id)
              ? { ...app, status: "shortlisted" }
              : app,
          ),
        );
        break;
      case "reject":
        setApplications((apps) =>
          apps.map((app) =>
            selectedApplications.includes(app.id)
              ? { ...app, status: "rejected" }
              : app,
          ),
        );
        break;
      case "archive":
        // Implement archive logic
        break;
    }
    setSelectedApplications([]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/5 p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Applications
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and review all candidate applications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Users className="mr-2 h-4 w-4" />
              New Candidate
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
                <p className="text-sm text-muted-foreground mt-1">Total</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
                <p className="text-sm text-muted-foreground mt-1">New</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {stats.shortlisted}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Shortlisted
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.interview}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Interview</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">
                  {stats.hired}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Hired</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {stats.averageMatchScore}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">Avg. Match</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-primary">
                      Candidate Applications
                    </CardTitle>
                    <CardDescription>
                      {filteredApplications.length} applications found
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search candidates..."
                        className="pl-9 w-full sm:w-50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 p-6 border-b">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all"
                      checked={
                        selectedApplications.length ===
                          filteredApplications.length &&
                        filteredApplications.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                    <label htmlFor="select-all" className="text-sm font-medium">
                      Select all
                    </label>
                  </div>

                  {selectedApplications.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedApplications.length} selected
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Bulk Actions
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleBulkAction("shortlist")}
                          >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Shortlist
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleBulkAction("reject")}
                          >
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleBulkAction("archive")}
                          >
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                  <div className="flex-1" />

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-37.5">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger className="w-37.5">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Company Website">
                        Company Website
                      </SelectItem>
                      <SelectItem value="Referral">Referral</SelectItem>
                      <SelectItem value="Indeed">Indeed</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Applications List */}
                <div className="divide-y">
                  {filteredApplications.map((application) => (
                    <div
                      key={application.id}
                      className="p-6 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex items-start gap-2">
                            <Checkbox
                              checked={selectedApplications.includes(
                                application.id,
                              )}
                              onCheckedChange={(checked) =>
                                handleSelectApplication(
                                  application.id,
                                  checked as boolean,
                                )
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleStarToggle(application.id)}
                            >
                              <Star
                                className={`h-4 w-4 ${application.isStarred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                              />
                            </Button>
                          </div>
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={application.candidateAvatar} />
                            <AvatarFallback>
                              {application.candidateName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg truncate">
                                {application.candidateName}
                              </h3>
                              {getStatusBadge(application.status)}
                              <Badge variant="outline" className="gap-1">
                                <Tag className="h-3 w-3" />
                                {application.source}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">
                                  {application.email}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <span>{application.phone}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                <span className="font-medium">
                                  {application.position}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>
                                  {application.department} •{" "}
                                  {application.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <GraduationCap className="h-3 w-3" />
                                <span>{application.education}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              {application.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {application.notes && (
                              <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                  {application.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <div
                              className={`text-2xl font-bold ${getMatchScoreColor(application.matchScore)}`}
                            >
                              {application.matchScore}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Match Score
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="text-right">
                              <div className="text-sm font-medium">Applied</div>
                              <div className="text-sm text-muted-foreground">
                                {application.appliedDate}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                Last Activity
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {application.lastActivity}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Resume
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Add Note
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(
                                      application.id,
                                      "shortlisted",
                                    )
                                  }
                                >
                                  <ThumbsUp className="mr-2 h-4 w-4" />
                                  Shortlist
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(
                                      application.id,
                                      "interview",
                                    )
                                  }
                                >
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Schedule Interview
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleStatusChange(
                                      application.id,
                                      "rejected",
                                    )
                                  }
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredApplications.length} of {applications.length}{" "}
                  applications
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-primary">
                  Application Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {[
                  { source: "LinkedIn", count: 42, percentage: 35 },
                  { source: "Company Website", count: 38, percentage: 32 },
                  { source: "Referral", count: 25, percentage: 21 },
                  { source: "Indeed", count: 12, percentage: 10 },
                  { source: "Other", count: 3, percentage: 2 },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{stat.source}</span>
                      <span className="text-muted-foreground">
                        {stat.count} ({stat.percentage}%)
                      </span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-auto py-3 flex-col gap-2"
                  >
                    <Send className="h-5 w-5 text-primary" />
                    <span>Bulk Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-3 flex-col gap-2"
                  >
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Schedule</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-3 flex-col gap-2"
                  >
                    <FileText className="h-5 w-5 text-primary" />
                    <span>Resume Parser</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-3 flex-col gap-2"
                  >
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-primary">
                  Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-sm">New</span>
                    </div>
                    <span className="font-medium">{stats.new}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">Shortlisted</span>
                    </div>
                    <span className="font-medium">{stats.shortlisted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span className="text-sm">Interview</span>
                    </div>
                    <span className="font-medium">{stats.interview}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="text-sm">Hired</span>
                    </div>
                    <span className="font-medium">{stats.hired}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterApplicationsPage;
