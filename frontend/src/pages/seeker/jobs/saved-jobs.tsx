import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Briefcase,
  Globe,
  Bookmark,
  MoreVertical,
  ExternalLink,
  Share2,
  Bell,
  Eye,
  CheckCircle,
  X,
  ChevronRight,
  TrendingUp,
  Download,
  Calendar,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const SavedJobs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([1, 3, 5]);

  const savedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      logo: "TC",
      location: "San Francisco, CA",
      salary: "$120,000 - $180,000",
      type: "Full-time",
      postedDate: "2 days ago",
      experience: "5+ years",
      tags: ["React", "TypeScript", "Next.js", "Tailwind"],
      status: "applied",
      matchScore: 92,
      remote: true,
      priority: true,
      applicationStatus: "Under Review",
      savedDate: "3 days ago",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignStudio",
      logo: "DS",
      location: "New York, NY",
      salary: "$90,000 - $130,000",
      type: "Full-time",
      postedDate: "1 week ago",
      experience: "3+ years",
      tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      status: "not_applied",
      matchScore: 87,
      remote: true,
      priority: false,
      savedDate: "5 days ago",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      logo: "SX",
      location: "Remote",
      salary: "$100,000 - $150,000",
      type: "Full-time",
      postedDate: "3 days ago",
      experience: "4+ years",
      tags: ["React", "Node.js", "AWS", "GraphQL"],
      status: "interview",
      matchScore: 95,
      remote: true,
      priority: true,
      applicationStatus: "Interview Scheduled",
      savedDate: "1 week ago",
      color: "bg-green-500/10 text-green-600",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "ProductLabs",
      logo: "PL",
      location: "Austin, TX",
      salary: "$130,000 - $200,000",
      type: "Full-time",
      postedDate: "2 weeks ago",
      experience: "6+ years",
      tags: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
      status: "rejected",
      matchScore: 76,
      remote: false,
      priority: false,
      applicationStatus: "Not Selected",
      savedDate: "2 weeks ago",
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      id: 5,
      title: "Backend Developer",
      company: "CloudTech",
      logo: "CT",
      location: "Seattle, WA",
      salary: "$110,000 - $160,000",
      type: "Contract",
      postedDate: "4 days ago",
      experience: "5+ years",
      tags: ["Python", "Django", "PostgreSQL", "Docker"],
      status: "not_applied",
      matchScore: 88,
      remote: true,
      priority: true,
      savedDate: "2 days ago",
      color: "bg-cyan-500/10 text-cyan-600",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "AnalyticsAI",
      logo: "AA",
      location: "Boston, MA",
      salary: "$115,000 - $170,000",
      type: "Full-time",
      postedDate: "1 week ago",
      experience: "4+ years",
      tags: ["Kubernetes", "Terraform", "CI/CD", "AWS"],
      status: "applied",
      matchScore: 81,
      remote: false,
      priority: false,
      applicationStatus: "Application Submitted",
      savedDate: "3 days ago",
      color: "bg-indigo-500/10 text-indigo-600",
    },
    {
      id: 7,
      title: "Mobile Developer",
      company: "AppWorks",
      logo: "AW",
      location: "Remote",
      salary: "$95,000 - $140,000",
      type: "Full-time",
      postedDate: "5 days ago",
      experience: "3+ years",
      tags: ["React Native", "iOS", "Android", "TypeScript"],
      status: "not_applied",
      matchScore: 90,
      remote: true,
      priority: true,
      savedDate: "1 day ago",
      color: "bg-pink-500/10 text-pink-600",
    },
    {
      id: 8,
      title: "Data Scientist",
      company: "DataFlow Inc.",
      logo: "DF",
      location: "Chicago, IL",
      salary: "$125,000 - $190,000",
      type: "Full-time",
      postedDate: "2 weeks ago",
      experience: "5+ years",
      tags: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      status: "offer",
      matchScore: 94,
      remote: false,
      priority: true,
      applicationStatus: "Offer Received",
      savedDate: "3 weeks ago",
      color: "bg-red-500/10 text-red-600",
    },
  ];

  const filters = [
    { id: "remote", label: "Remote Only" },
    { id: "priority", label: "High Priority" },
    { id: "applied", label: "Already Applied" },
    { id: "interview", label: "Interview Stage" },
    { id: "new", label: "New (Last 3 days)" },
  ];

  const filterOptions = [
    { value: "all", label: "All Jobs", count: savedJobs.length },
    {
      value: "not_applied",
      label: "To Apply",
      count: savedJobs.filter((job) => job.status === "not_applied").length,
    },
    {
      value: "applied",
      label: "Applied",
      count: savedJobs.filter((job) => job.status === "applied").length,
    },
    {
      value: "interview",
      label: "Interview",
      count: savedJobs.filter((job) => job.status === "interview").length,
    },
    {
      value: "offer",
      label: "Offer",
      count: savedJobs.filter((job) => job.status === "offer").length,
    },
    {
      value: "rejected",
      label: "Rejected",
      count: savedJobs.filter((job) => job.status === "rejected").length,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "not_applied":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            To Apply
          </Badge>
        );
      case "applied":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Applied
          </Badge>
        );
      case "interview":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Interview
          </Badge>
        );
      case "offer":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Offer
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const toggleBookmark = (jobId: number) => {
    setBookmarkedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchQuery("");
  };

  const filteredJobs = savedJobs.filter((job) => {
    // Tab filtering
    if (activeTab !== "all" && job.status !== activeTab) return false;

    // Search filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter options
    if (selectedFilters.length > 0) {
      return selectedFilters.every((filter) => {
        switch (filter) {
          case "remote":
            return job.remote;
          case "priority":
            return job.priority;
          case "applied":
            return (
              job.status === "applied" ||
              job.status === "interview" ||
              job.status === "offer"
            );
          case "interview":
            return job.status === "interview";
          case "new":
            return (
              job.postedDate.includes("day") && parseInt(job.postedDate) <= 3
            );
          default:
            return true;
        }
      });
    }

    return true;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Jobs</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your job applications in one place
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export List
          </Button>
          <Button className="gap-2 bg-linear-to-r from-primary to-primary/80">
            <TrendingUp className="h-4 w-4" />
            Track Applications
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Saved</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">
                  {savedJobs.length}
                </p>
              </div>
              <Bookmark className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">To Apply</p>
                <p className="text-3xl font-bold text-green-900 mt-2">
                  {
                    savedJobs.filter((job) => job.status === "not_applied")
                      .length
                  }
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">
                  In Progress
                </p>
                <p className="text-3xl font-bold text-purple-900 mt-2">
                  {
                    savedJobs.filter(
                      (job) =>
                        job.status === "applied" || job.status === "interview",
                    ).length
                  }
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Avg. Match</p>
                <p className="text-3xl font-bold text-amber-900 mt-2">
                  {Math.round(
                    savedJobs.reduce((acc, job) => acc + job.matchScore, 0) /
                      savedJobs.length,
                  )}
                  %
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search saved jobs by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {selectedFilters.length > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {selectedFilters.length}
                </Badge>
              )}
            </Button>
            <Select defaultValue="newest">
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="font-semibold">Filter Jobs</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filters.map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={filter.id}
                      checked={selectedFilters.includes(filter.id)}
                      onCheckedChange={() => handleFilterToggle(filter.id)}
                    />
                    <Label
                      htmlFor={filter.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {filter.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="gap-1 pl-3 pr-2 py-1"
              >
                {filters.find((f) => f.id === filter)?.label}
                <button
                  onClick={() => handleFilterToggle(filter)}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <TabsList>
            {filterOptions.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className="relative"
              >
                {option.label}
                <Badge variant="secondary" className="ml-2 h-5 min-w-5 p-0">
                  {option.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {savedJobs.length} jobs
          </div>
        </div>

        {/* Jobs Grid */}
        <TabsContent value={activeTab} className="mt-0">
          {filteredJobs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || selectedFilters.length > 0
                    ? "Try adjusting your search or filters"
                    : "Start saving jobs to see them here"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className={cn(
                    "hover:shadow-lg transition-all duration-300 border-2",
                    job.priority && "border-primary/20 hover:border-primary/40",
                    job.status === "offer" && "border-green-200",
                    job.status === "rejected" && "border-red-100",
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className={cn("h-12 w-12", job.color)}>
                          <AvatarFallback className="font-semibold">
                            {job.logo}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Building className="h-3 w-3" />
                            {job.company}
                            {job.remote && (
                              <>
                                <span className="text-muted-foreground">•</span>
                                <Globe className="h-3 w-3" />
                                <span>Remote</span>
                              </>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleBookmark(job.id)}
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              bookmarkedJobs.includes(job.id)
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-muted-foreground",
                            )}
                          />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Job
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Bell className="mr-2 h-4 w-4" />
                              Set Reminder
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onClick={() => toggleBookmark(job.id)}
                            >
                              <Bookmark className="mr-2 h-4 w-4" />
                              Remove from Saved
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      {/* Job Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.postedDate}</span>
                        </div>
                      </div>

                      {/* Status Bar */}
                      {job.status !== "not_applied" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">
                              Application Status
                            </span>
                            <span
                              className={cn(
                                "font-semibold",
                                job.status === "offer" && "text-green-600",
                                job.status === "rejected" && "text-red-600",
                              )}
                            >
                              {job.applicationStatus}
                            </span>
                          </div>
                          <Progress
                            value={
                              job.status === "applied"
                                ? 30
                                : job.status === "interview"
                                  ? 60
                                  : job.status === "offer"
                                    ? 90
                                    : job.status === "rejected"
                                      ? 100
                                      : 0
                            }
                            className={cn(
                              "h-2",
                              job.status === "offer" &&
                                "bg-green-100 [&>div]:bg-green-500",
                              job.status === "rejected" &&
                                "bg-red-100 [&>div]:bg-red-500",
                            )}
                          />
                        </div>
                      )}

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

                      {/* Match Score */}
                      <div className="flex items-center justify-between p-3 bg-linear-to-r from-muted/20 to-muted/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            Match Score
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-32">
                            <Progress value={job.matchScore} className="h-2" />
                          </div>
                          <span className="font-bold text-primary">
                            {job.matchScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 border-t">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        {getStatusBadge(job.status)}
                        {job.priority && (
                          <Badge
                            variant="default"
                            className="bg-linear-to-r from-amber-500 to-orange-500"
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Priority
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {job.status === "not_applied" ? (
                          <Button size="sm" className="gap-2">
                            <ExternalLink className="h-3 w-3" />
                            Apply Now
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="gap-2">
                            <Calendar className="h-3 w-3" />
                            Track Progress
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="gap-2">
                          <ChevronRight className="h-3 w-3" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">
                Need help organizing your job search?
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Set reminders, track deadlines, and get application tips
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Bell className="h-4 w-4" />
                Set Reminders
              </Button>
              <Button className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Time
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedJobs;
