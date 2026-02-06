import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Clock4,
  FileText,
  MapPin,
  Building,
  ExternalLink,
  Filter,
  Search,
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const Applications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const applicationStatuses = [
    { id: "all", label: "All Applications", count: 12 },
    { id: "submitted", label: "Submitted", count: 5 },
    { id: "review", label: "Under Review", count: 3 },
    { id: "interview", label: "Interview", count: 2 },
    { id: "offered", label: "Offered", count: 1 },
    { id: "rejected", label: "Rejected", count: 1 },
  ];

  const statusConfig = {
    submitted: {
      label: "Submitted",
      color: "bg-blue-100 text-blue-700",
      icon: Clock4,
    },
    review: {
      label: "Under Review",
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    interview: {
      label: "Interview",
      color: "bg-purple-100 text-purple-700",
      icon: Calendar,
    },
    offered: {
      label: "Offered",
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-700",
      icon: XCircle,
    },
  };

  const applications = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      logo: "TC",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15",
      lastUpdate: "2 days ago",
      status: "interview",
      interviewDate: "2024-01-25",
      interviewTime: "2:00 PM PST",
      interviewType: "Video Call",
      salary: "$130,000 - $160,000",
      applicationProgress: 75,
      notes: "Second round interview scheduled",
    },
    {
      id: 2,
      jobTitle: "UX/UI Designer",
      company: "DesignStudio",
      logo: "DS",
      location: "Remote",
      appliedDate: "2024-01-10",
      lastUpdate: "1 week ago",
      status: "review",
      salary: "$85,000 - $115,000",
      applicationProgress: 40,
      notes: "Portfolio review completed",
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      logo: "SX",
      location: "New York, NY",
      appliedDate: "2024-01-05",
      lastUpdate: "3 days ago",
      status: "offered",
      salary: "$110,000 - $140,000",
      applicationProgress: 100,
      notes: "Offer received - negotiating terms",
    },
    {
      id: 4,
      jobTitle: "Product Manager",
      company: "ProductLabs",
      logo: "PL",
      location: "Austin, TX",
      appliedDate: "2024-01-12",
      lastUpdate: "Yesterday",
      status: "submitted",
      salary: "$120,000 - $150,000",
      applicationProgress: 25,
      notes: "Application confirmed",
    },
    {
      id: 5,
      jobTitle: "DevOps Engineer",
      company: "CloudTech",
      logo: "CT",
      location: "Remote",
      appliedDate: "2023-12-20",
      lastUpdate: "2 weeks ago",
      status: "rejected",
      salary: "$95,000 - $135,000",
      applicationProgress: 0,
      notes: "Position filled internally",
    },
    {
      id: 6,
      jobTitle: "Data Scientist",
      company: "AnalyticsAI",
      logo: "AA",
      location: "Boston, MA",
      appliedDate: "2024-01-08",
      lastUpdate: "5 days ago",
      status: "interview",
      interviewDate: "2024-01-22",
      interviewTime: "11:00 AM EST",
      interviewType: "Technical Screening",
      salary: "$115,000 - $150,000",
      applicationProgress: 60,
      notes: "Technical assessment passed",
    },
  ];

  const filteredApplications = applications
    .filter((app) => {
      if (statusFilter === "all") return true;
      return app.status === statusFilter;
    })
    .filter((app) => {
      return (
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  const getStatusIcon = (status: string) => {
    const Icon =
      statusConfig[status as keyof typeof statusConfig]?.icon || Clock4;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              My Applications
            </h1>
            <p className="text-muted-foreground mt-2">
              Track and manage all your job applications in one place
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <FileText className="mr-2 h-4 w-4" />
            Application Tracker
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Applications
                </p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interviews</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">25%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by job title or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {applicationStatuses.map((status) => (
                    <DropdownMenuItem
                      key={status.id}
                      onClick={() => setStatusFilter(status.id)}
                      className="flex justify-between"
                    >
                      {status.label}
                      <Badge variant="secondary">{status.count}</Badge>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-35">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="title">Job Title</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="mt-4">
            <Tabs
              defaultValue="all"
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <TabsList className="w-full overflow-x-auto">
                {applicationStatuses.map((status) => (
                  <TabsTrigger
                    key={status.id}
                    value={status.id}
                    className="flex gap-2"
                  >
                    {status.label}
                    <Badge variant="secondary" className="ml-1">
                      {status.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No applications found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "No applications match your search criteria"
                  : "You haven't applied to any jobs yet"}
              </p>
              <Button variant="outline">Browse Jobs</Button>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((app) => {
            const statusInfo =
              statusConfig[app.status as keyof typeof statusConfig];
            return (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {app.logo}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {app.jobTitle}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Building className="h-3 w-3" />
                          {app.company}
                          <Separator orientation="vertical" className="h-4" />
                          <MapPin className="h-3 w-3" />
                          {app.location}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant="outline"
                        className={`${statusInfo.color} border-transparent font-medium`}
                      >
                        {getStatusIcon(app.status)}
                        <span className="ml-1">{statusInfo.label}</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Applied on{" "}
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          Application Progress
                        </span>
                        <span className="font-medium">
                          {app.applicationProgress}%
                        </span>
                      </div>
                      <Progress
                        value={app.applicationProgress}
                        className="h-2"
                      />
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Salary Range
                          </span>
                          <span className="text-sm font-medium">
                            {app.salary}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Last Updated
                          </span>
                          <span className="text-sm font-medium">
                            {app.lastUpdate}
                          </span>
                        </div>
                      </div>
                      {app.interviewDate && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Interview Date
                            </span>
                            <span className="text-sm font-medium">
                              {new Date(app.interviewDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              Time & Type
                            </span>
                            <span className="text-sm font-medium">
                              {app.interviewTime} • {app.interviewType}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    {app.notes && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm">
                          <span className="font-medium">Notes: </span>
                          {app.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      Withdraw
                    </Button>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Job Posting
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>

      {/* Tips Section */}
      <Card className="mt-8 bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Application Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • Follow up on applications after 7-10 days if you haven't
                  heard back
                </li>
                <li>
                  • Prepare for interviews by researching the company and role
                </li>
                <li>
                  • Customize your resume for each application to highlight
                  relevant skills
                </li>
                <li>
                  • Track your application progress to identify patterns and
                  improve
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Applications;
