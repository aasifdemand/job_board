import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Download,
  MoreVertical,
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  BarChart3,
  Copy,
  Trash2,
  MessageSquare,
  UserCheck,
  ChevronRight,
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
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("my-jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);

  // Recruiter's posted jobs
  const myPostedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      department: "Engineering",
      location: "San Francisco, CA",
      salary: "$120,000 - $180,000",
      type: "Full-time",
      experience: "5+ years",
      status: "active",
      applicants: 48,
      interviews: 12,
      hires: 2,
      postedDate: "2 days ago",
      views: 245,
      matchScore: 92,
      tags: ["React", "TypeScript", "Next.js", "Tailwind"],
      featured: true,
      budgetSpent: "$1,200",
      promotion: "boosted",
      candidates: [
        { id: 1, name: "Alex Johnson", status: "interview", match: 94 },
        { id: 2, name: "Sarah Miller", status: "applied", match: 87 },
        { id: 3, name: "David Chen", status: "offer", match: 95 },
      ],
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignStudio",
      department: "Design",
      location: "Remote",
      salary: "$90,000 - $130,000",
      type: "Full-time",
      experience: "3+ years",
      status: "active",
      applicants: 32,
      interviews: 8,
      hires: 1,
      postedDate: "1 week ago",
      views: 189,
      matchScore: 87,
      tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      featured: true,
      budgetSpent: "$850",
      promotion: "premium",
      candidates: [
        { id: 1, name: "Maria Garcia", status: "applied", match: 82 },
        { id: 2, name: "James Wilson", status: "screening", match: 76 },
      ],
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "CloudTech",
      department: "Engineering",
      location: "New York, NY",
      salary: "$110,000 - $160,000",
      type: "Full-time",
      experience: "4+ years",
      status: "paused",
      applicants: 56,
      interviews: 15,
      hires: 0,
      postedDate: "2 weeks ago",
      views: 312,
      matchScore: 85,
      tags: ["Node.js", "Python", "AWS", "PostgreSQL"],
      featured: false,
      budgetSpent: "$950",
      promotion: "standard",
      candidates: [
        { id: 1, name: "Michael Brown", status: "interview", match: 88 },
        { id: 2, name: "Emily Davis", status: "applied", match: 79 },
      ],
    },
    {
      id: 4,
      title: "Product Manager",
      company: "ProductLabs",
      department: "Product",
      location: "Austin, TX",
      salary: "$130,000 - $200,000",
      type: "Full-time",
      experience: "6+ years",
      status: "closed",
      applicants: 24,
      interviews: 6,
      hires: 1,
      postedDate: "1 month ago",
      views: 167,
      matchScore: 88,
      tags: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
      featured: false,
      budgetSpent: "$680",
      promotion: "standard",
      candidates: [{ id: 1, name: "Robert Lee", status: "hired", match: 91 }],
    },
  ];

  const stats = [
    {
      label: "Jobs Posted",
      value: "8",
      change: "+2",
      icon: Briefcase,
      color: "text-primary",
    },
    {
      label: "Active Jobs",
      value: "5",
      change: "+1",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Total Applicants",
      value: "160",
      change: "+28",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Interviews",
      value: "41",
      change: "+9",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      label: "Hires",
      value: "4",
      change: "+2",
      icon: UserCheck,
      color: "text-amber-600",
    },
    {
      label: "Hire Rate",
      value: "8.3%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-cyan-600",
    },
  ];

  const recentCandidates = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Frontend Dev",
      status: "interview",
      job: "Frontend Developer",
      applied: "2 hours ago",
      match: 94,
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "UX Designer",
      status: "applied",
      job: "UI/UX Designer",
      applied: "Today",
      match: 87,
    },
    {
      id: 3,
      name: "David Chen",
      role: "Full Stack Engineer",
      status: "offer",
      job: "Backend Engineer",
      applied: "2 days ago",
      match: 95,
    },
    {
      id: 4,
      name: "Maria Garcia",
      role: "Product Manager",
      status: "screening",
      job: "Product Manager",
      applied: "3 days ago",
      match: 82,
    },
    {
      id: 5,
      name: "James Wilson",
      role: "DevOps Engineer",
      status: "rejected",
      job: "DevOps Engineer",
      applied: "1 week ago",
      match: 76,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge variant="outline" className="border-amber-300 text-amber-700">
            Paused
          </Badge>
        );
      case "closed":
        return (
          <Badge variant="outline" className="border-gray-300 text-gray-700">
            Closed
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="border-blue-300 text-blue-700">
            Draft
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCandidateStatusBadge = (status: string) => {
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

  const getPromotionBadge = (promotion: string) => {
    switch (promotion) {
      case "boosted":
        return (
          <Badge className="bg-linear-to-r from-amber-500 to-orange-500 text-white">
            Boosted
          </Badge>
        );
      case "premium":
        return (
          <Badge className="bg-linear-to-r from-purple-600 to-pink-600 text-white">
            Premium
          </Badge>
        );
      case "standard":
        return <Badge variant="outline">Standard</Badge>;
      default:
        return <Badge variant="outline">None</Badge>;
    }
  };

  const toggleJobSelection = (jobId: number) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Job Postings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your job listings, review candidates, and track hiring
            progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
          <Link to="/recruiter/jobs/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Post New Job
            </Button>
          </Link>
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
        {/* Left Column - My Job Postings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search your job postings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Job Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="my-jobs">
                  My Job Postings ({myPostedJobs.length})
                </TabsTrigger>
                <TabsTrigger value="candidates">Candidates (160)</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              {selectedJobs.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedJobs.length} selected
                  </span>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Copy className="h-3 w-3" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* My Job Postings Tab */}
            <TabsContent value="my-jobs" className="mt-0 space-y-4">
              {myPostedJobs.map((job) => (
                <Card
                  key={job.id}
                  className={cn(
                    "hover:shadow-lg transition-all",
                    selectedJobs.includes(job.id) &&
                      "bg-primary/5 border-primary/40",
                  )}
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Job Details */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={selectedJobs.includes(job.id)}
                                  onChange={() => toggleJobSelection(job.id)}
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                    {job.company.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">
                                  {job.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{job.company}</Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {job.department}
                                  </span>
                                  <span className="text-muted-foreground">
                                    •
                                  </span>
                                  {getStatusBadge(job.status)}
                                  {getPromotionBadge(job.promotion)}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                {job.salary}
                              </div>
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {job.postedDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/recruiter/jobs/${job.id}/candidates`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <Users className="h-3 w-3" />
                                {job.applicants} Candidates
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="More">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Job Performance Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Applicants
                            </p>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <p className="text-lg font-bold">
                                {job.applicants}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Interviews
                            </p>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-purple-600" />
                              <p className="text-lg font-bold">
                                {job.interviews}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Hires
                            </p>
                            <div className="flex items-center gap-2">
                              <UserCheck className="h-4 w-4 text-green-600" />
                              <p className="text-lg font-bold">{job.hires}</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Conversion Rate
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="w-16">
                                <Progress
                                  value={
                                    (job.hires / job.applicants) * 100 || 0
                                  }
                                  className="h-2"
                                />
                              </div>
                              <span className="font-bold">
                                {Math.round(
                                  (job.hires / job.applicants) * 100,
                                ) || 0}
                                %
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Top Candidates
                            </p>
                            <div className="flex -space-x-2">
                              {job.candidates.slice(0, 3).map((candidate) => (
                                <Avatar
                                  key={candidate.id}
                                  className="h-6 w-6 border-2 border-background"
                                >
                                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                    {candidate.name.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {job.candidates.length > 3 && (
                                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                                  +{job.candidates.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Candidates Tab */}
            <TabsContent value="candidates" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Candidates</CardTitle>
                  <CardDescription>
                    Candidates across all your job postings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{candidate.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {candidate.role}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {getCandidateStatusBadge(candidate.status)}
                              <span className="text-xs text-muted-foreground">
                                Applied for {candidate.job}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              {candidate.match}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Match
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              {candidate.applied}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/recruiter/candidates" className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                      <ChevronRight className="h-4 w-4" />
                      View All Candidates
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Analytics</CardTitle>
                  <CardDescription>
                    Performance metrics for your job postings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Application Funnel
                          </span>
                          <span className="text-sm text-muted-foreground">
                            160 total
                          </span>
                        </div>
                        <div className="space-y-2">
                          {[
                            {
                              stage: "Applied",
                              count: 160,
                              percentage: 100,
                              color: "bg-blue-500",
                            },
                            {
                              stage: "Screening",
                              count: 82,
                              percentage: 51,
                              color: "bg-purple-500",
                            },
                            {
                              stage: "Interview",
                              count: 41,
                              percentage: 26,
                              color: "bg-pink-500",
                            },
                            {
                              stage: "Offer",
                              count: 8,
                              percentage: 5,
                              color: "bg-amber-500",
                            },
                            {
                              stage: "Hired",
                              count: 4,
                              percentage: 2.5,
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
                              <Progress
                                value={item.percentage}
                                className="h-2"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Time to Hire</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg border">
                            <p className="text-sm text-muted-foreground">
                              Average
                            </p>
                            <p className="text-2xl font-bold">32 days</p>
                          </div>
                          <div className="p-4 rounded-lg border">
                            <p className="text-sm text-muted-foreground">
                              Best
                            </p>
                            <p className="text-2xl font-bold">18 days</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Cost per Hire</h4>
                        <div className="p-4 rounded-lg border">
                          <p className="text-sm text-muted-foreground">
                            Average Cost
                          </p>
                          <p className="text-2xl font-bold">$4,200</p>
                          <p className="text-sm text-green-600">
                            ↓ 5% from last month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Top Performing Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Jobs</CardTitle>
              <CardDescription>By number of applicants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myPostedJobs
                  .sort((a, b) => b.applicants - a.applicants)
                  .slice(0, 3)
                  .map((job) => (
                    <div key={job.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{job.title}</h4>
                        <span className="text-sm font-bold">
                          {job.applicants}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">
                            Hire Rate
                          </span>
                          <span>
                            {Math.round((job.hires / job.applicants) * 100) ||
                              0}
                            %
                          </span>
                        </div>
                        <Progress
                          value={(job.hires / job.applicants) * 100 || 0}
                          className="h-1"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/recruiter/analytics" className="w-full">
                <Button variant="outline" className="w-full gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Full Analytics
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Hiring Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring Goals</CardTitle>
              <CardDescription>Q1 2024 Targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Positions to Fill</span>
                  <span className="text-sm font-medium">4/12</span>
                </div>
                <Progress value={33} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Diversity Hiring</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Time to Hire Target
                  </span>
                  <span className="text-sm font-medium">30 days</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
