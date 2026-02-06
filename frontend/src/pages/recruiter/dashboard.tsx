import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  DollarSign,
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  Calendar,
  Download,
  Share2,
  Bell,
  Plus,
  Mail,
  Phone,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

const RecruiterDashboard = () => {
  // Stats data
  const stats = [
    {
      label: "Total Candidates",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Active Jobs",
      value: "24",
      change: "+3",
      icon: Briefcase,
      color: "text-primary",
    },
    {
      label: "Interviews",
      value: "156",
      change: "+18%",
      icon: Calendar,
      color: "text-primary",
    },
    {
      label: "Hire Rate",
      value: "8.3%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      label: "Avg Time to Hire",
      value: "32 days",
      change: "-4 days",
      icon: Clock,
      color: "text-primary",
    },
    {
      label: "Avg Salary",
      value: "$94,500",
      change: "+5.2%",
      icon: DollarSign,
      color: "text-primary",
    },
  ];

  // Candidates data
  const candidates = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Frontend Dev",
      status: "interview",
      match: 94,
      applied: "2 days ago",
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "UX Designer",
      status: "new",
      match: 87,
      applied: "Today",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Full Stack Engineer",
      status: "offer",
      match: 95,
      applied: "1 week ago",
    },
    {
      id: 4,
      name: "Maria Garcia",
      role: "Product Manager",
      status: "review",
      match: 82,
      applied: "3 days ago",
    },
    {
      id: 5,
      name: "James Wilson",
      role: "DevOps Engineer",
      status: "rejected",
      match: 76,
      applied: "1 week ago",
    },
  ];

  // Interview schedule
  const interviews = [
    {
      candidate: "Alex Johnson",
      time: "Today, 2:00 PM",
      role: "Frontend Dev",
      type: "Technical",
    },
    {
      candidate: "Sarah Miller",
      time: "Tomorrow, 11:00 AM",
      role: "UX Designer",
      type: "Portfolio Review",
    },
    {
      candidate: "Michael Brown",
      time: "Mar 22, 10:00 AM",
      role: "Backend Engineer",
      type: "System Design",
    },
  ];

  // Chart data with green theme
  const hiringTrendData = [
    { month: "Jan", candidates: 240, hires: 12 },
    { month: "Feb", candidates: 320, hires: 18 },
    { month: "Mar", candidates: 380, hires: 22 },
    { month: "Apr", candidates: 420, hires: 25 },
    { month: "May", candidates: 380, hires: 20 },
    { month: "Jun", candidates: 450, hires: 28 },
  ];

  const sourceData = [
    { name: "LinkedIn", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Indeed", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Referrals", value: 15, color: "hsl(var(--chart-3))" },
    { name: "Career Site", value: 10, color: "hsl(var(--chart-4))" },
    { name: "Other", value: 5, color: "hsl(var(--chart-5))" },
  ];

  const statusData = [
    { status: "Applied", candidates: 450, color: "hsl(var(--chart-1))" },
    { status: "Screening", candidates: 220, color: "hsl(var(--chart-2))" },
    { status: "Interview", candidates: 120, color: "hsl(var(--chart-3))" },
    { status: "Offer", candidates: 35, color: "hsl(var(--chart-4))" },
    { status: "Hired", candidates: 22, color: "hsl(var(--chart-5))" },
  ];

  // Candidates table data
  const candidatesTableData = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "(555) 123-4567",
      role: "Senior Frontend Dev",
      status: "Interview",
      date: "2024-03-15",
      score: 94,
    },
    {
      id: 2,
      name: "Sarah Miller",
      email: "sarah@example.com",
      phone: "(555) 987-6543",
      role: "UX Designer",
      status: "New",
      date: "2024-03-16",
      score: 87,
    },
    {
      id: 3,
      name: "David Chen",
      email: "david@example.com",
      phone: "(555) 456-7890",
      role: "Full Stack Engineer",
      status: "Offer",
      date: "2024-03-10",
      score: 95,
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria@example.com",
      phone: "(555) 234-5678",
      role: "Product Manager",
      status: "Review",
      date: "2024-03-13",
      score: 82,
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james@example.com",
      phone: "(555) 876-5432",
      role: "DevOps Engineer",
      status: "Rejected",
      date: "2024-03-09",
      score: 76,
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "(555) 345-6789",
      role: "Data Scientist",
      status: "Screening",
      date: "2024-03-14",
      score: 89,
    },
    {
      id: 7,
      name: "Robert Lee",
      email: "robert@example.com",
      phone: "(555) 765-4321",
      role: "Backend Developer",
      status: "Interview",
      date: "2024-03-12",
      score: 91,
    },
    {
      id: 8,
      name: "Lisa Wang",
      email: "lisa@example.com",
      phone: "(555) 654-3210",
      role: "Mobile Developer",
      status: "New",
      date: "2024-03-17",
      score: 84,
    },
  ];

  // Chart configurations
  const hiringTrendConfig = {
    candidates: {
      label: "Candidates",
      color: "hsl(var(--chart-1))",
    },
    hires: {
      label: "Hires",
      color: "hsl(var(--chart-2))",
    },
  };

  const sourceConfig = {
    LinkedIn: { label: "LinkedIn", color: "hsl(var(--chart-1))" },
    Indeed: { label: "Indeed", color: "hsl(var(--chart-2))" },
    Referrals: { label: "Referrals", color: "hsl(var(--chart-3))" },
    "Career Site": { label: "Career Site", color: "hsl(var(--chart-4))" },
    Other: { label: "Other", color: "hsl(var(--chart-5))" },
  };

  const statusConfig = {
    Applied: { label: "Applied", color: "hsl(var(--chart-1))" },
    Screening: { label: "Screening", color: "hsl(var(--chart-2))" },
    Interview: { label: "Interview", color: "hsl(var(--chart-3))" },
    Offer: { label: "Offer", color: "hsl(var(--chart-4))" },
    Hired: { label: "Hired", color: "hsl(var(--chart-5))" },
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "interview":
        return (
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
            Interview
          </Badge>
        );
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            New
          </Badge>
        );
      case "offer":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Offer
          </Badge>
        );
      case "review":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Rejected
          </Badge>
        );
      case "screening":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            Screening
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Recruiter Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage candidates, track hiring metrics, and schedule interviews
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search candidates..." className="pl-10 w-48" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Job
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <p
                    className={cn(
                      "text-sm mt-1",
                      stat.change.includes("+") ||
                        stat.change.includes("- days")
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
                    "bg-primary/10",
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
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hiring Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Hiring Trends</CardTitle>
              <CardDescription>
                Candidate applications vs hires over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={hiringTrendConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hiringTrendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="candidates"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="hires"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Candidate Sources</CardTitle>
                <CardDescription>Where candidates come from</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={sourceConfig}>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {sourceData.map((source) => (
                    <div
                      key={source.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: source.color }}
                        />
                        <span>{source.name}</span>
                      </div>
                      <span className="font-medium">{source.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Status */}
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>Current pipeline breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={statusConfig}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={statusData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="status"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="candidates"
                        radius={[4, 4, 0, 0]}
                        fill="hsl(var(--primary))"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Candidates & Actions */}
        <div className="space-y-6">
          {/* Top Candidates */}
          <Card>
            <CardHeader>
              <CardTitle>Top Candidates</CardTitle>
              <CardDescription>Recently applied candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-sm">
                          {candidate.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {candidate.role}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              candidate.status === "interview"
                                ? "secondary"
                                : candidate.status === "offer"
                                  ? "default"
                                  : candidate.status === "rejected"
                                    ? "destructive"
                                    : "outline"
                            }
                            className="text-xs"
                          >
                            {candidate.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {candidate.applied}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        {candidate.match}%
                      </div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2">
                <Eye className="h-4 w-4" />
                View All Candidates
              </Button>
            </CardFooter>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Today and tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interviews.map((interview, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="font-semibold">{interview.candidate}</h4>
                      <p className="text-sm text-muted-foreground">
                        {interview.role}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {interview.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {interview.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Interview
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Candidates Database</CardTitle>
              <CardDescription>All candidates in your pipeline</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Candidate
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Contact
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Role
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Date Applied
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Match Score
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidatesTableData.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {candidate.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{candidate.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {candidate.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {candidate.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{candidate.role}</div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(candidate.status)}
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          {new Date(candidate.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={candidate.score}
                            className="w-20 h-2"
                          />
                          <span className="font-medium">
                            {candidate.score}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {candidatesTableData.length} of 2847 candidates
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">Need to hire quickly?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Use our AI matching to find perfect candidates faster
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Jobs
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button className="gap-2">
                <Bell className="h-4 w-4" />
                Set Alerts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruiterDashboard;
