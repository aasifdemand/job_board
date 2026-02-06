import { useState } from "react";
import {
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  MapPin,
  Download,
  RefreshCw,
  Award,
  Star,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Globe,
  Bell,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mock chart data - In a real app, you'd use a charting library like Recharts
const ChartPlaceholder = ({
  type = "bar",
  height = 200,
}: {
  type?: string;
  height?: number;
}) => (
  <div className="relative" style={{ height }}>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        {type === "bar" && (
          <BarChart3 className="h-12 w-12 text-muted-foreground/30 mx-auto" />
        )}
        {type === "line" && (
          <LineChart className="h-12 w-12 text-muted-foreground/30 mx-auto" />
        )}
        {type === "pie" && (
          <PieChart className="h-12 w-12 text-muted-foreground/30 mx-auto" />
        )}
        <p className="text-sm text-muted-foreground mt-2">
          Chart Visualization
        </p>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background/80 to-transparent" />
  </div>
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  const metrics = {
    totalApplications: 48,
    applicationsThisMonth: 12,
    interviewRate: 35,
    offerRate: 8.3,
    avgResponseTime: 4.2,
    topSkills: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind"],
    activeJobs: 24,
    rejectedApplications: 18,
    pendingApplications: 14,
    ghostedApplications: 5,
  };

  const trends = [
    { label: "Applications", value: 48, change: 12, trend: "up" },
    { label: "Interviews", value: 17, change: 5, trend: "up" },
    { label: "Offers", value: 4, change: 2, trend: "up" },
    { label: "Rejections", value: 18, change: -3, trend: "down" },
  ];

  const applicationStatus = [
    { status: "Applied", count: 14, color: "bg-blue-500", percentage: 29.2 },
    {
      status: "Interview",
      count: 10,
      color: "bg-purple-500",
      percentage: 20.8,
    },
    { status: "Offer", count: 4, color: "bg-green-500", percentage: 8.3 },
    { status: "Rejected", count: 18, color: "bg-red-500", percentage: 37.5 },
    { status: "Ghosted", count: 5, color: "bg-gray-500", percentage: 10.4 },
  ];

  const jobSources = [
    { source: "LinkedIn", count: 22, percentage: 45.8, icon: "💼" },
    { source: "Indeed", count: 12, percentage: 25, icon: "🔍" },
    { source: "Company Sites", count: 8, percentage: 16.7, icon: "🏢" },
    { source: "Referrals", count: 4, percentage: 8.3, icon: "🤝" },
    { source: "Other", count: 2, percentage: 4.2, icon: "📋" },
  ];

  const topCompanies = [
    { name: "TechCorp Inc.", applications: 8, interviews: 3, status: "active" },
    {
      name: "DesignStudio",
      applications: 5,
      interviews: 2,
      status: "interview",
    },
    { name: "StartupXYZ", applications: 4, interviews: 1, status: "offer" },
    { name: "ProductLabs", applications: 3, interviews: 1, status: "rejected" },
    { name: "CloudTech", applications: 3, interviews: 0, status: "applied" },
  ];

  const skillMatchAnalysis = [
    { skill: "React", match: 92, demand: 85, importance: "high" },
    { skill: "TypeScript", match: 88, demand: 90, importance: "high" },
    { skill: "Next.js", match: 85, demand: 80, importance: "medium" },
    { skill: "Node.js", match: 78, demand: 75, importance: "medium" },
    { skill: "Tailwind CSS", match: 95, demand: 70, importance: "medium" },
    { skill: "GraphQL", match: 65, demand: 60, importance: "low" },
  ];

  const timelineEvents = [
    {
      date: "Today",
      event: "Interview with TechCorp",
      type: "interview",
      time: "2:00 PM",
    },
    {
      date: "Tomorrow",
      event: "Follow-up with DesignStudio",
      type: "followup",
      time: "10:00 AM",
    },
    {
      date: "Nov 15",
      event: "Application deadline for StartupXYZ",
      type: "deadline",
      time: "11:59 PM",
    },
    {
      date: "Nov 18",
      event: "Expected response from ProductLabs",
      type: "response",
      time: "EOD",
    },
  ];

  const insights = [
    {
      title: "High Demand Skills",
      description:
        "Your TypeScript skills are in 90% demand across applications",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      type: "opportunity",
    },
    {
      title: "Response Time Improvement",
      description: "Average response time decreased from 6.2 to 4.2 days",
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      type: "improvement",
    },
    {
      title: "Interview Conversion",
      description: "35% of applications lead to interviews (industry avg: 25%)",
      icon: <Award className="h-5 w-5 text-purple-600" />,
      type: "success",
    },
    {
      title: "Ghosting Rate",
      description: "10.4% of applications receive no response",
      icon: <Bell className="h-5 w-5 text-amber-600" />,
      type: "warning",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Job Search Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your progress, optimize applications, and improve success
            rates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-linear-to-r from-primary to-primary/80">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trends.map((item) => (
          <Card key={item.label} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-3xl font-bold mt-2">{item.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {item.trend === "up" ? (
                      <ChevronUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        item.trend === "up" ? "text-green-600" : "text-red-600",
                      )}
                    >
                      {item.change > 0 ? `+${item.change}` : item.change}%
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      from last month
                    </span>
                  </div>
                </div>
                <div
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center",
                    item.trend === "up" ? "bg-green-100" : "bg-red-100",
                  )}
                >
                  {item.label === "Applications" && (
                    <Briefcase className="h-6 w-6 text-green-600" />
                  )}
                  {item.label === "Interviews" && (
                    <Users className="h-6 w-6 text-purple-600" />
                  )}
                  {item.label === "Offers" && (
                    <Award className="h-6 w-6 text-green-600" />
                  )}
                  {item.label === "Rejections" && (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Application Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Trends</CardTitle>
                  <CardDescription>
                    Weekly application volume and success rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder type="line" height={300} />
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Status Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of all applications by current status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applicationStatus.map((item) => (
                      <div key={item.status} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full ${item.color}`}
                            />
                            <span className="font-medium">{item.status}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-bold">{item.count}</span>
                            <span className="text-muted-foreground">
                              ({item.percentage}%)
                            </span>
                          </div>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm">Interview Rate</span>
                      </div>
                      <span className="font-bold text-primary">
                        {metrics.interviewRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Offer Rate</span>
                      </div>
                      <span className="font-bold text-green-600">
                        {metrics.offerRate}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Avg Response Time</span>
                      </div>
                      <span className="font-bold text-blue-600">
                        {metrics.avgResponseTime} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Active Job Applications</span>
                      </div>
                      <span className="font-bold text-purple-600">
                        {metrics.activeJobs}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Sources</CardTitle>
                  <CardDescription>
                    Where your applications come from
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobSources.map((source) => (
                      <div
                        key={source.source}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                            <span className="text-lg">{source.icon}</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {source.source}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {source.count} applications
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{source.percentage}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Application Funnel</CardTitle>
                <CardDescription>
                  Conversion rates through each stage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { stage: "Applications", count: 48, percentage: 100 },
                    { stage: "Screening", count: 32, percentage: 66.7 },
                    { stage: "Interviews", count: 17, percentage: 35.4 },
                    { stage: "Final Round", count: 8, percentage: 16.7 },
                    { stage: "Offers", count: 4, percentage: 8.3 },
                  ].map((stage, index) => (
                    <div key={stage.stage} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-bold text-primary">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{stage.stage}</p>
                            <p className="text-sm text-muted-foreground">
                              {stage.count} candidates
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{stage.percentage}%</p>
                          <p className="text-xs text-muted-foreground">
                            {index > 0
                              ? `↓ ${((stage.percentage / 100) * 100).toFixed(1)}%`
                              : "Total"}
                          </p>
                        </div>
                      </div>
                      <Progress value={stage.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time Analysis</CardTitle>
                <CardDescription>How quickly companies respond</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder type="bar" height={300} />
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Fastest Response</span>
                    </div>
                    <span className="font-bold">1.2 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Slowest Response</span>
                    </div>
                    <span className="font-bold">21 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Median Response Time</span>
                    </div>
                    <span className="font-bold">4.2 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Quality */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Application Quality Score</CardTitle>
                <CardDescription>
                  Track improvements in application quality over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder type="line" height={250} />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-sm font-medium text-blue-700">
                      Resume Score
                    </p>
                    <p className="text-2xl font-bold text-blue-900 mt-2">
                      87/100
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      ↑ 12% this month
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                    <p className="text-sm font-medium text-green-700">
                      Cover Letter
                    </p>
                    <p className="text-2xl font-bold text-green-900 mt-2">
                      92/100
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      ↑ 8% this month
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                    <p className="text-sm font-medium text-purple-700">
                      Portfolio
                    </p>
                    <p className="text-2xl font-bold text-purple-900 mt-2">
                      95/100
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      ↑ 15% this month
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                    <p className="text-sm font-medium text-amber-700">
                      Interview Prep
                    </p>
                    <p className="text-2xl font-bold text-amber-900 mt-2">
                      84/100
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      ↑ 20% this month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Match Analysis</CardTitle>
              <CardDescription>
                How your skills match job requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillMatchAnalysis.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            skill.importance === "high"
                              ? "default"
                              : skill.importance === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {skill.skill}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {skill.demand}% demand
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32">
                          <Progress value={skill.match} className="h-2" />
                        </div>
                        <span className="font-bold min-w-12 text-right">
                          {skill.match}% match
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">
                      Skill Development Priority
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Based on market demand and your current level
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Target className="h-4 w-4" />
                    Create Learning Plan
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-red-700">
                        High Priority
                      </span>
                      <TrendingUp className="h-4 w-4 text-red-600" />
                    </div>
                    <p className="text-sm text-red-600">GraphQL, AWS, Docker</p>
                  </div>
                  <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-amber-700">
                        Medium Priority
                      </span>
                      <TrendingUp className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-sm text-amber-600">
                      Python, MongoDB, CI/CD
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-green-700">
                        Strong Skills
                      </span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-sm text-green-600">
                      React, TypeScript, Next.js
                    </p>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Companies Tab */}
        <TabsContent value="companies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Companies */}
            <Card>
              <CardHeader>
                <CardTitle>Top Companies</CardTitle>
                <CardDescription>Your most active applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCompanies.map((company) => (
                    <div
                      key={company.name}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">
                            {company.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {company.applications} application
                              {company.applications > 1 ? "s" : ""}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {company.interviews} interview
                              {company.interviews > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            company.status === "offer"
                              ? "default"
                              : company.status === "interview"
                                ? "secondary"
                                : company.status === "rejected"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {company.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Distribution</CardTitle>
                <CardDescription>
                  Applications by industry sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder type="pie" height={300} />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-sm">Technology</span>
                      <span className="ml-auto font-bold">65%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">Finance</span>
                      <span className="ml-auto font-bold">15%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                      <span className="text-sm">Healthcare</span>
                      <span className="ml-auto font-bold">10%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="text-sm">E-commerce</span>
                      <span className="ml-auto font-bold">5%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-sm">Education</span>
                      <span className="ml-auto font-bold">3%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500" />
                      <span className="text-sm">Other</span>
                      <span className="ml-auto font-bold">2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Analysis */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Location Analysis</CardTitle>
                <CardDescription>
                  Applications by location and remote preference
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Top Locations</h4>
                    </div>
                    {[
                      { city: "San Francisco", count: 12 },
                      { city: "New York", count: 8 },
                      { city: "Remote", count: 15 },
                      { city: "Austin", count: 5 },
                      { city: "Seattle", count: 4 },
                    ].map((location) => (
                      <div
                        key={location.city}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{location.city}</span>
                        <Badge>{location.count}</Badge>
                      </div>
                    ))}
                  </div>
                  <div className="md:col-span-2">
                    <ChartPlaceholder type="bar" height={200} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Search Timeline</CardTitle>
              <CardDescription>
                Upcoming events and important dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center",
                          event.type === "interview"
                            ? "bg-blue-100 text-blue-600"
                            : event.type === "followup"
                              ? "bg-purple-100 text-purple-600"
                              : event.type === "deadline"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600",
                        )}
                      >
                        {event.type === "interview" && (
                          <Users className="h-5 w-5" />
                        )}
                        {event.type === "followup" && (
                          <MessageSquare className="h-5 w-5" />
                        )}
                        {event.type === "deadline" && (
                          <Clock className="h-5 w-5" />
                        )}
                        {event.type === "response" && (
                          <Bell className="h-5 w-5" />
                        )}
                      </div>
                      {index < timelineEvents.length - 1 && (
                        <div className="h-full w-px bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{event.event}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.date} • {event.time}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Set Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Daily Application Goal</h4>
                    <p className="text-sm text-muted-foreground">
                      Track your daily job application target
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">3/5</p>
                      <p className="text-sm text-muted-foreground">
                        applications today
                      </p>
                    </div>
                    <Button>Log Application</Button>
                  </div>
                </div>
                <Progress value={60} className="mt-4 h-2" />
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
                <CardDescription>
                  Personalized recommendations based on your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{insight.icon}</div>
                        <div>
                          <h4 className="font-semibold">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {insight.description}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-3 gap-2"
                          >
                            Learn More
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Success Predictor */}
            <Card>
              <CardHeader>
                <CardTitle>Success Predictor</CardTitle>
                <CardDescription>
                  Estimated time to job offer based on current trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-linear-to-r from-green-100 to-blue-100 mb-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">28</p>
                      <p className="text-sm text-muted-foreground">days</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Estimated Time to Offer</h3>
                  <p className="text-muted-foreground mt-2">
                    Based on your current interview rate and application quality
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Increase applications by 20%
                    </span>
                    <span className="font-bold text-green-600">→ 21 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Improve interview skills</span>
                    <span className="font-bold text-green-600">→ 24 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current trajectory</span>
                    <span className="font-bold text-blue-600">→ 28 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Actionable steps to improve your job search
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl border border-blue-200 bg-blue-50">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-700">
                        Immediate Actions
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm text-blue-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5" />
                        Follow up with 3 pending applications
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5" />
                        Apply to 2 remote positions today
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5" />
                        Schedule 1 networking call this week
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-700">
                        Skill Development
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm text-purple-600">
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 mt-0.5" />
                        Complete GraphQL course (8 hours)
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 mt-0.5" />
                        Build 1 portfolio project with AWS
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="h-4 w-4 mt-0.5" />
                        Practice 3 system design questions
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-green-200 bg-green-50">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-700">
                        Long-term Strategy
                      </h4>
                    </div>
                    <ul className="space-y-2 text-sm text-green-600">
                      <li className="flex items-start gap-2">
                        <Globe className="h-4 w-4 mt-0.5" />
                        Expand to 3 new target companies
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="h-4 w-4 mt-0.5" />
                        Attend 2 industry conferences
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe className="h-4 w-4 mt-0.5" />
                        Get 2 professional certifications
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download Action Plan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
