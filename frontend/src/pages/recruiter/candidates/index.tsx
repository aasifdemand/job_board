import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  CheckCircle,
  MoreVertical,
  Eye,
  UserCheck,
  UserX,
  FileText,
  ExternalLink,
  FilterX,
  RefreshCw,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Candidates = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Candidates data
  const candidates = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      currentRole: "Senior Frontend Developer",
      currentCompany: "TechCorp Inc.",
      experience: "8 years",
      education: "MSc Computer Science, Stanford",
      status: "interview",
      stage: "Technical Interview",
      appliedFor: "Senior Frontend Developer",
      appliedDate: "2024-03-15",
      matchScore: 94,
      salaryExpectation: "$140,000",
      noticePeriod: "30 days",
      skills: [
        "React",
        "TypeScript",
        "Next.js",
        "GraphQL",
        "Tailwind",
        "Node.js",
      ],
      source: "LinkedIn",
      lastContact: "2 days ago",
      notes: "Strong technical skills, good cultural fit",
      tags: ["Top Candidate", "Fast Responder"],
    },
    {
      id: 2,
      name: "Sarah Miller",
      email: "sarah.m@example.com",
      phone: "(555) 987-6543",
      location: "Remote",
      currentRole: "UX/UI Designer",
      currentCompany: "DesignStudio",
      experience: "5 years",
      education: "BFA Design, RISD",
      status: "applied",
      stage: "Resume Screening",
      appliedFor: "UX/UI Designer",
      appliedDate: "2024-03-16",
      matchScore: 87,
      salaryExpectation: "$110,000",
      noticePeriod: "60 days",
      skills: [
        "Figma",
        "Adobe XD",
        "Prototyping",
        "User Research",
        "Design Systems",
      ],
      source: "Company Career Page",
      lastContact: "Today",
      notes: "Impressive portfolio, needs more enterprise experience",
      tags: ["Portfolio Review"],
    },
    {
      id: 3,
      name: "David Chen",
      email: "david.chen@example.com",
      phone: "(555) 456-7890",
      location: "New York, NY",
      currentRole: "Full Stack Engineer",
      currentCompany: "StartupXYZ",
      experience: "6 years",
      education: "BS Computer Engineering, MIT",
      status: "offer",
      stage: "Offer Extended",
      appliedFor: "Full Stack Engineer",
      appliedDate: "2024-03-10",
      matchScore: 95,
      salaryExpectation: "$150,000",
      noticePeriod: "2 weeks",
      skills: ["React", "Node.js", "Python", "AWS", "PostgreSQL", "Docker"],
      source: "Referral",
      lastContact: "Yesterday",
      notes: "Excellent technical interview, strong leadership skills",
      tags: ["High Priority", "Ready to Hire"],
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria.g@example.com",
      phone: "(555) 234-5678",
      location: "Austin, TX",
      currentRole: "Product Manager",
      currentCompany: "ProductLabs",
      experience: "7 years",
      education: "MBA, Harvard Business School",
      status: "screening",
      stage: "Phone Screening",
      appliedFor: "Product Manager",
      appliedDate: "2024-03-13",
      matchScore: 82,
      salaryExpectation: "$160,000",
      noticePeriod: "45 days",
      skills: [
        "Product Strategy",
        "Agile",
        "User Stories",
        "Roadmapping",
        "A/B Testing",
      ],
      source: "LinkedIn",
      lastContact: "3 days ago",
      notes: "Strong PM experience, needs technical validation",
      tags: [],
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.w@example.com",
      phone: "(555) 876-5432",
      location: "Seattle, WA",
      currentRole: "DevOps Engineer",
      currentCompany: "CloudTech",
      experience: "4 years",
      education: "BS Computer Science, University of Washington",
      status: "rejected",
      stage: "Not Selected",
      appliedFor: "DevOps Engineer",
      appliedDate: "2024-03-09",
      matchScore: 76,
      salaryExpectation: "$130,000",
      noticePeriod: "90 days",
      skills: ["Kubernetes", "Terraform", "AWS", "CI/CD", "Python"],
      source: "Indeed",
      lastContact: "1 week ago",
      notes: "Good technical skills but poor cultural fit",
      tags: [],
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "(555) 345-6789",
      location: "Boston, MA",
      currentRole: "Data Scientist",
      currentCompany: "AnalyticsAI",
      experience: "5 years",
      education: "PhD Data Science, Carnegie Mellon",
      status: "interview",
      stage: "Case Study Review",
      appliedFor: "Data Scientist",
      appliedDate: "2024-03-14",
      matchScore: 89,
      salaryExpectation: "$145,000",
      noticePeriod: "30 days",
      skills: [
        "Python",
        "Machine Learning",
        "SQL",
        "TensorFlow",
        "PyTorch",
        "Statistics",
      ],
      source: "LinkedIn",
      lastContact: "Today",
      notes: "Excellent academic background, strong analytical skills",
      tags: ["PhD Candidate"],
    },
  ];

  const stats = [
    {
      label: "Total Candidates",
      value: "2,847",
      change: "+12%",
      icon: Briefcase,
      color: "text-primary",
    },
    {
      label: "New Applications",
      value: "48",
      change: "+8",
      icon: UserCheck,
      color: "text-blue-600",
    },
    {
      label: "In Interview",
      value: "156",
      change: "+18%",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      label: "Offers Extended",
      value: "24",
      change: "+5",
      icon: Award,
      color: "text-green-600",
    },
    {
      label: "Hired",
      value: "18",
      change: "+3",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      label: "Rejected",
      value: "432",
      change: "-4%",
      icon: UserX,
      color: "text-red-600",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "interview":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            Interview
          </Badge>
        );
      case "applied":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Applied
          </Badge>
        );
      case "offer":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Offer
          </Badge>
        );
      case "screening":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            Screening
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Rejected
          </Badge>
        );
      case "hired":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Hired
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "LinkedIn":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            LinkedIn
          </Badge>
        );
      case "Referral":
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            Referral
          </Badge>
        );
      case "Indeed":
        return (
          <Badge className="bg-purple-50 text-purple-700 border-purple-200">
            Indeed
          </Badge>
        );
      case "Company Career Page":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200">
            Career Page
          </Badge>
        );
      default:
        return <Badge variant="outline">{source}</Badge>;
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return candidate.status === "applied";
    if (activeTab === "interview") return candidate.status === "interview";
    if (activeTab === "offer") return candidate.status === "offer";
    if (activeTab === "hired") return candidate.status === "hired";
    if (activeTab === "rejected") return candidate.status === "rejected";
    return true;
  });

  const toggleCandidateSelection = (candidateId: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId],
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground mt-2">
            Manage, review, and communicate with candidates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Mail className="h-4 w-4" />
            Bulk Email
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <p
                    className={cn(
                      "text-sm mt-1",
                      stat.change.includes("+")
                        ? "text-green-600"
                        : "text-red-600",
                    )}
                  >
                    {stat.change}
                  </p>
                </div>
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    stat.color.replace("text-", "bg-") + "/10",
                  )}
                >
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Candidates List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates by name, skills, or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Job Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="frontend">
                        Frontend Developer
                      </SelectItem>
                      <SelectItem value="backend">Backend Engineer</SelectItem>
                      <SelectItem value="designer">UX/UI Designer</SelectItem>
                      <SelectItem value="pm">Product Manager</SelectItem>
                      <SelectItem value="devops">DevOps Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="indeed">Indeed</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="career-page">Career Page</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    {showAdvancedFilters ? "Hide Filters" : "More Filters"}
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Advanced Filters</h4>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <FilterX className="h-3 w-3" />
                      Clear All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Experience Level</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="entry">
                            Entry Level (0-2 years)
                          </SelectItem>
                          <SelectItem value="mid">
                            Mid Level (3-5 years)
                          </SelectItem>
                          <SelectItem value="senior">
                            Senior (6+ years)
                          </SelectItem>
                          <SelectItem value="lead">
                            Lead/Manager (8+ years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Match Score</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select score range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Scores</SelectItem>
                          <SelectItem value="high">High (90%+)</SelectItem>
                          <SelectItem value="good">Good (75-89%)</SelectItem>
                          <SelectItem value="average">
                            Average (60-74%)
                          </SelectItem>
                          <SelectItem value="low">Low (Below 60%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Location Preference</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="remote">Remote Only</SelectItem>
                          <SelectItem value="onsite">On-site Only</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">
                  All Candidates ({candidates.length})
                </TabsTrigger>
                <TabsTrigger value="new">
                  New ({candidates.filter((c) => c.status === "applied").length}
                  )
                </TabsTrigger>
                <TabsTrigger value="interview">
                  Interview (
                  {candidates.filter((c) => c.status === "interview").length})
                </TabsTrigger>
                <TabsTrigger value="offer">
                  Offer ({candidates.filter((c) => c.status === "offer").length}
                  )
                </TabsTrigger>
                <TabsTrigger value="hired">
                  Hired ({candidates.filter((c) => c.status === "hired").length}
                  )
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected (
                  {candidates.filter((c) => c.status === "rejected").length})
                </TabsTrigger>
              </TabsList>
              {selectedCandidates.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedCandidates.length} selected
                  </span>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    Schedule
                  </Button>
                </div>
              )}
            </div>

            {/* Candidates List */}
            <TabsContent value={activeTab} className="mt-0 space-y-4">
              {filteredCandidates.map((candidate) => (
                <Card
                  key={candidate.id}
                  className={cn(
                    "hover:shadow-lg transition-all",
                    selectedCandidates.includes(candidate.id) &&
                      "bg-primary/5 border-primary/40",
                  )}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Selection Checkbox & Avatar */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCandidates.includes(candidate.id)}
                          onChange={() =>
                            toggleCandidateSelection(candidate.id)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"
                        />
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Candidate Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-bold">
                                {candidate.name}
                              </h3>
                              {getStatusBadge(candidate.status)}
                              {candidate.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                {candidate.currentRole} at{" "}
                                {candidate.currentCompany}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {candidate.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4" />
                                {candidate.experience} experience
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">
                                  Applied for:
                                </span>
                                <Badge variant="secondary">
                                  {candidate.appliedFor}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">
                                  Source:
                                </span>
                                {getSourceBadge(candidate.source)}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end gap-3">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {candidate.matchScore}%
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Match Score
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                title="View Profile"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Send Email"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Schedule Call"
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="More Actions"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Contact & Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Contact
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm">{candidate.email}</p>
                              <p className="text-sm">{candidate.phone}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Expectations
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm">
                                Salary: {candidate.salaryExpectation}
                              </p>
                              <p className="text-sm">
                                Notice: {candidate.noticePeriod}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Stage & Timeline
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm">{candidate.stage}</p>
                              <p className="text-sm text-muted-foreground">
                                Applied {candidate.appliedDate}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Last contact: {candidate.lastContact}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Skills
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="font-normal"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Notes & Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t">
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">Notes:</span>{" "}
                              {candidate.notes}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <FileText className="h-3 w-3 mr-1" />
                              Resume
                            </Button>
                            <Button size="sm">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Candidate Tools */}
        <div className="space-y-6">
          {/* Candidate Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Candidate Tools</CardTitle>
              <CardDescription>
                Quick actions for candidate management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full gap-2 justify-start">
                <Mail className="h-4 w-4" />
                Email All Candidates
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Calendar className="h-4 w-4" />
                Schedule Interviews
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start">
                <MessageSquare className="h-4 w-4" />
                Send SMS Campaign
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start">
                <RefreshCw className="h-4 w-4" />
                Update Status
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Shield className="h-4 w-4" />
                Background Check
              </Button>
            </CardContent>
          </Card>

          {/* Pipeline Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Overview</CardTitle>
              <CardDescription>Current hiring pipeline status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    stage: "Applied",
                    count: 2847,
                    percentage: 100,
                    color: "bg-blue-500",
                  },
                  {
                    stage: "Screening",
                    count: 1432,
                    percentage: 50,
                    color: "bg-purple-500",
                  },
                  {
                    stage: "Interview",
                    count: 712,
                    percentage: 25,
                    color: "bg-pink-500",
                  },
                  {
                    stage: "Offer",
                    count: 156,
                    percentage: 5.5,
                    color: "bg-amber-500",
                  },
                  {
                    stage: "Hired",
                    count: 68,
                    percentage: 2.4,
                    color: "bg-green-500",
                  },
                ].map((item) => (
                  <div key={item.stage} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.stage}</span>
                      <span>
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/recruiter/analytics" className="w-full">
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Detailed Analytics
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Top Skills in Demand */}
          <Card>
            <CardHeader>
              <CardTitle>Top Skills in Demand</CardTitle>
              <CardDescription>Most sought-after skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { skill: "React", demand: 92, candidates: 45 },
                  { skill: "TypeScript", demand: 88, candidates: 38 },
                  { skill: "AWS", demand: 85, candidates: 32 },
                  { skill: "Python", demand: 82, candidates: 41 },
                  { skill: "UI/UX Design", demand: 78, candidates: 28 },
                ].map((item) => (
                  <div key={item.skill} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.skill}</span>
                      <span>{item.demand}% demand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Progress value={item.demand} className="h-2" />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {item.candidates} candidates
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    candidate: "Alex Johnson",
                    time: "Today, 2:00 PM",
                    role: "Technical Interview",
                  },
                  {
                    candidate: "Emily Davis",
                    time: "Tomorrow, 11:00 AM",
                    role: "Case Study Review",
                  },
                  {
                    candidate: "Michael Brown",
                    time: "Mar 22, 10:00 AM",
                    role: "System Design",
                  },
                ].map((interview, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-sm">
                        {interview.candidate}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {interview.role}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {interview.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/recruiter/interviews" className="w-full">
                <Button variant="outline" className="w-full gap-2">
                  <Calendar className="h-4 w-4" />
                  View All Interviews
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
