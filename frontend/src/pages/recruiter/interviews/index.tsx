import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import {
  Calendar,
  Clock,
  Filter,
  Search,
  User,
  Briefcase,
  MapPin,
  CalendarDays,
  ChevronRight,
  Download,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

interface Interview {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  position: string;
  date: string;
  time: string;
  duration: string;
  type: "virtual" | "in-person";
  status: "scheduled" | "completed" | "cancelled" | "pending";
  stage: "screening" | "technical" | "hr" | "final";
  interviewer: string;
  location?: string;
  meetingLink?: string;
}

export default function RecruiterInterviewsPage() {
  const interviews = [
    {
      id: "1",
      candidateName: "Alex Johnson",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      position: "Senior Frontend Developer",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "45 min",
      type: "virtual",
      status: "scheduled",
      stage: "technical",
      interviewer: "Sarah Wilson",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: "2",
      candidateName: "Maria Garcia",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      position: "Product Manager",
      date: "2024-01-14",
      time: "2:30 PM",
      duration: "60 min",
      type: "in-person",
      status: "completed",
      stage: "final",
      interviewer: "John Davis",
      location: "Conference Room A",
    },
    {
      id: "3",
      candidateName: "David Chen",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      position: "Backend Engineer",
      date: "2024-01-16",
      time: "11:15 AM",
      duration: "60 min",
      type: "virtual",
      status: "scheduled",
      stage: "technical",
      interviewer: "Michael Brown",
      meetingLink: "https://zoom.us/j/123456789",
    },
    {
      id: "4",
      candidateName: "Emma Wilson",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      position: "UX Designer",
      date: "2024-01-13",
      time: "9:00 AM",
      duration: "45 min",
      type: "virtual",
      status: "completed",
      stage: "hr",
      interviewer: "Lisa Taylor",
    },
    {
      id: "5",
      candidateName: "Ryan Miller",
      candidateAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
      position: "DevOps Engineer",
      date: "2024-01-17",
      time: "3:45 PM",
      duration: "60 min",
      type: "in-person",
      status: "scheduled",
      stage: "screening",
      interviewer: "Tom Harris",
      location: "Meeting Room 3",
    },
  ];

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredInterviews = interviews.filter((interview) => {
    const matchesStatus =
      statusFilter === "all" || interview.status === statusFilter;
    const matchesStage =
      stageFilter === "all" || interview.stage === stageFilter;
    const matchesSearch =
      searchQuery === "" ||
      interview.candidateName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesStage && matchesSearch;
  });

  const stats = {
    total: interviews.length,
    scheduled: interviews.filter((i) => i.status === "scheduled").length,
    completed: interviews.filter((i) => i.status === "completed").length,
    thisWeek: 8,
    completionRate: 65,
  };

  const getStatusBadgeVariant = (status: Interview["status"]) => {
    switch (status) {
      case "scheduled":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "pending":
        return "outline";
    }
  };

  const getStageBadgeVariant = (stage: Interview["stage"]) => {
    switch (stage) {
      case "screening":
        return "outline";
      case "technical":
        return "secondary";
      case "hr":
        return "default";
      case "final":
        return "default";
    }
  };

  const handleDownloadReport = () => {
    // Implement download functionality
    console.log("Downloading report...");
  };

  const handleViewInterview = (id: string) => {
    // Implement view interview details
    console.log(`Viewing interview ${id}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Interview Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and track all candidate interviews
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={handleDownloadReport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Interviews
                  </p>
                  <p className="text-3xl font-bold text-primary mt-2">
                    {stats.total}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Scheduled
                  </p>
                  <p className="text-3xl font-bold text-primary mt-2">
                    {stats.scheduled}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-primary mt-2">
                    {stats.completed}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completion Rate
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-3xl font-bold text-primary">
                      {stats.completionRate}%
                    </p>
                    <Progress
                      value={stats.completionRate}
                      className="w-24 h-2"
                    />
                  </div>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interview List */}
          <div className="lg:col-span-2">
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-primary">
                      Upcoming Interviews
                    </CardTitle>
                    <CardDescription>
                      Manage and track all candidate interviews
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search interviews..."
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
                <div className="flex flex-wrap gap-4 p-6 border-b">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-45">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger className="w-45">
                      <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      <SelectItem value="screening">Screening</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="hr">HR Round</SelectItem>
                      <SelectItem value="final">Final Round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interview List */}
                <div className="divide-y">
                  {filteredInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="p-6 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={interview.candidateAvatar} />
                            <AvatarFallback>
                              {interview.candidateName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">
                                {interview.candidateName}
                              </h3>
                              <Badge
                                variant={getStatusBadgeVariant(
                                  interview.status as
                                    | "scheduled"
                                    | "completed"
                                    | "cancelled"
                                    | "pending",
                                )}
                              >
                                {interview.status}
                              </Badge>
                              <Badge
                                variant={getStageBadgeVariant(
                                  interview.stage as
                                    | "technical"
                                    | "final"
                                    | "hr"
                                    | "screening",
                                )}
                              >
                                {interview.stage}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                <span>{interview.position}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>
                                  Interviewer: {interview.interviewer}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{interview.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {interview.time} ({interview.duration})
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                {interview.type === "virtual" ? (
                                  <>
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span>Virtual</span>
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="h-3 w-3" />
                                    <span>{interview.location}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewInterview(interview.id)}
                          >
                            View Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem>Add Notes</DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Cancel Interview
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-primary">Today's Schedule</CardTitle>
                <CardDescription>
                  2 interviews scheduled for today
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {interviews
                    .filter((i) => i.date === "2024-01-15")
                    .map((interview) => (
                      <div
                        key={interview.id}
                        className="p-4 rounded-lg border border-primary/20 bg-linear-to-r from-primary/5 to-transparent"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">
                              {interview.candidateName}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {interview.position}
                            </p>
                          </div>
                          <Badge variant="secondary">{interview.time}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            size="sm"
                            className="w-full bg-primary hover:bg-primary/90"
                          >
                            Join Meeting
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Types */}
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-primary">Interview Types</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Virtual</span>
                      <span className="font-medium text-primary">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">In-Person</span>
                      <span className="font-medium text-primary">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>
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
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Schedule New</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-3 flex-col gap-2"
                  >
                    <User className="h-5 w-5 text-primary" />
                    <span>Add Candidate</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-3 flex-col gap-2"
                  >
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span>Add Position</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-3 flex-col gap-2"
                  >
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Time Slots</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
