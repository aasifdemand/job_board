import React, { type JSX } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  Users,
  Briefcase,
  MapPin,
  Globe,
  Calendar,
  TrendingUp,
  Edit,
  Plus,
  Mail,
  Phone,
  Link as LinkIcon,
  FileText,
  Heart,
  Share2,
  MoreVertical,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  department: string;
  joinDate: string;
  status: "active" | "on-leave" | "inactive";
}

interface OpenPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  applicants: number;
  status: "open" | "closed" | "on-hold";
  salary: string;
  postedDate: string;
  urgency: "high" | "medium" | "low";
}

interface CompanyStat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const Company = () => {
  const companyInfo = {
    name: "TechNova Solutions",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TechNova",
    industry: "Software & Technology",
    founded: "2018",
    employees: "245",
    headquarters: "San Francisco, CA",
    website: "www.technova.com",
    description:
      "A leading technology company specializing in AI-driven solutions for enterprise businesses. We're on a mission to revolutionize how companies leverage data and automation.",
    mission:
      "To empower businesses with intelligent automation solutions that drive efficiency, innovation, and sustainable growth.",
    culture: [
      "Innovation Driven",
      "Remote First",
      "Continuous Learning",
      "Work-Life Balance",
      "Diversity & Inclusion",
    ],
    benefits: [
      "Health Insurance",
      "Stock Options",
      "Flexible Hours",
      "Unlimited PTO",
      "Learning Budget",
      "Home Office Stipend",
    ],
  };

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Head of Talent Acquisition",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      email: "sarah.chen@technova.com",
      department: "HR",
      joinDate: "2020-03-15",
      status: "active",
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      role: "Technical Recruiter",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      email: "michael.r@technova.com",
      department: "Engineering",
      joinDate: "2021-08-22",
      status: "active",
    },
    {
      id: "3",
      name: "Emma Wilson",
      role: "Campus Recruiter",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      email: "emma.w@technova.com",
      department: "HR",
      joinDate: "2022-01-10",
      status: "active",
    },
    {
      id: "4",
      name: "David Park",
      role: "Recruitment Coordinator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      email: "david.p@technova.com",
      department: "Operations",
      joinDate: "2023-05-30",
      status: "active",
    },
    {
      id: "5",
      name: "Lisa Taylor",
      role: "HR Business Partner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      email: "lisa.t@technova.com",
      department: "HR",
      joinDate: "2019-11-05",
      status: "on-leave",
    },
  ];

  const openPositions: OpenPosition[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "full-time",
      applicants: 42,
      status: "open",
      salary: "$120,000 - $160,000",
      postedDate: "2024-01-10",
      urgency: "high",
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "San Francisco",
      type: "full-time",
      applicants: 28,
      status: "open",
      salary: "$140,000 - $180,000",
      postedDate: "2024-01-12",
      urgency: "medium",
    },
    {
      id: "3",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "full-time",
      applicants: 35,
      status: "open",
      salary: "$130,000 - $170,000",
      postedDate: "2024-01-08",
      urgency: "high",
    },
    {
      id: "4",
      title: "UX Designer",
      department: "Design",
      location: "New York",
      type: "full-time",
      applicants: 19,
      status: "on-hold",
      salary: "$90,000 - $120,000",
      postedDate: "2024-01-05",
      urgency: "low",
    },
    {
      id: "5",
      title: "Data Scientist",
      department: "Data Science",
      location: "Remote",
      type: "contract",
      applicants: 56,
      status: "open",
      salary: "$110,000 - $150,000",
      postedDate: "2024-01-15",
      urgency: "medium",
    },
  ];

  const stats: CompanyStat[] = [
    {
      label: "Total Employees",
      value: "245",
      change: +12,
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      label: "Open Positions",
      value: "18",
      change: +3,
      icon: <Briefcase className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      label: "Hiring Success Rate",
      value: "78%",
      change: +5,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-purple-600",
    },
    {
      label: "Avg. Time to Hire",
      value: "32 days",
      change: -8,
      icon: <Clock className="h-5 w-5" />,
      color: "text-orange-600",
    },
  ];

  const hiringPipeline = {
    total: 245,
    stages: [
      { name: "Applied", count: 156, percentage: 64 },
      { name: "Screening", count: 98, percentage: 40 },
      { name: "Interview", count: 65, percentage: 27 },
      { name: "Offer", count: 22, percentage: 9 },
      { name: "Hired", count: 15, percentage: 6 },
    ],
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "on-leave":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            On Leave
          </Badge>
        );
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "open":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Open
          </Badge>
        );
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      case "on-hold":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            On Hold
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Low
          </Badge>
        );
      default:
        return <Badge variant="outline">{urgency}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "full-time":
        return <Badge variant="default">Full-time</Badge>;
      case "part-time":
        return <Badge variant="secondary">Part-time</Badge>;
      case "contract":
        return <Badge variant="outline">Contract</Badge>;
      case "remote":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Remote
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/5 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                <AvatarImage src={companyInfo.logo} />
                <AvatarFallback>
                  <Building className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 p-1 bg-primary rounded-full">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-primary">
                {companyInfo.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Badge variant="outline" className="gap-1">
                  <Building className="h-3 w-3" />
                  {companyInfo.industry}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Users className="h-3 w-3" />
                  {companyInfo.employees} employees
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {companyInfo.headquarters}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  Founded {companyInfo.founded}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Edit className="mr-2 h-4 w-4" />
              Edit Company
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge
                        variant={stat.change >= 0 ? "default" : "destructive"}
                      >
                        {stat.change >= 0 ? "+" : ""}
                        {stat.change}%
                      </Badge>
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-full ${stat.color.replace("text", "bg")}/10`}
                  >
                    {React.cloneElement(stat?.icon as JSX.Element, {
                      className: `h-5 w-5 ${stat.color}`,
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-primary/5">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="data-[state=active]:bg-primary"
            >
              Team
            </TabsTrigger>
            <TabsTrigger
              value="positions"
              className="data-[state=active]:bg-primary"
            >
              Open Positions
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-primary"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-primary"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Company Description */}
              <Card className="lg:col-span-2 border-primary/20">
                <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                  <CardTitle className="text-primary">
                    About {companyInfo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {companyInfo.description}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      {companyInfo.mission}
                    </p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Company Culture</h3>
                      <ul className="space-y-2">
                        {companyInfo.culture.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Employee Benefits</h3>
                      <ul className="space-y-2">
                        {companyInfo.benefits.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Info */}
              <div className="space-y-6">
                <Card className="border-primary/20">
                  <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                    <CardTitle className="text-primary">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Website</p>
                        <a
                          href={`https://${companyInfo.website}`}
                          className="text-primary hover:underline"
                        >
                          {companyInfo.website}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>careers@{companyInfo.website.split(".")[0]}.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>(555) 123-4567</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hiring Pipeline */}
                <Card className="border-primary/20">
                  <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                    <CardTitle className="text-primary">
                      Hiring Pipeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    {hiringPipeline.stages.map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{stage.name}</span>
                          <span className="text-muted-foreground">
                            {stage.count} candidates
                          </span>
                        </div>
                        <Progress value={stage.percentage} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-primary">
                      Recruitment Team
                    </CardTitle>
                    <CardDescription>
                      Manage your recruitment team members
                    </CardDescription>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{member.name}</h4>
                            {getStatusBadge(member.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {member.role} • {member.department}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Joined {member.joinDate}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-primary">
                      Open Positions
                    </CardTitle>
                    <CardDescription>
                      {openPositions.length} positions currently open
                    </CardDescription>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Position
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {openPositions.map((position) => (
                    <Card
                      key={position.id}
                      className="border-primary/20 hover:border-primary/40 transition-colors"
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">
                                {position.title}
                              </h3>
                              {getStatusBadge(position.status)}
                              {getUrgencyBadge(position.urgency)}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                <span>{position.department}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{position.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {getTypeBadge(position.type)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{position.applicants} applicants</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="font-medium text-primary">
                                {position.salary}
                              </span>
                              <span className="text-muted-foreground">
                                Posted {position.postedDate}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              View Applicants
                            </Button>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              Edit Position
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                  <CardTitle className="text-primary">
                    Recruitment Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Candidate Quality Score
                      </span>
                      <span className="font-bold text-primary">8.2/10</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Diversity Index</span>
                      <span className="font-bold text-primary">74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Offer Acceptance Rate</span>
                      <span className="font-bold text-primary">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                  <CardTitle className="text-primary">
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {[
                    {
                      action: "New position posted",
                      user: "Sarah Chen",
                      time: "2 hours ago",
                    },
                    {
                      action: "Interview scheduled",
                      user: "Michael Rodriguez",
                      time: "5 hours ago",
                    },
                    {
                      action: "Candidate hired",
                      user: "Emma Wilson",
                      time: "1 day ago",
                    },
                    {
                      action: "Position closed",
                      user: "David Park",
                      time: "2 days ago",
                    },
                    {
                      action: "Team member added",
                      user: "Lisa Taylor",
                      time: "3 days ago",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5"
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          by {activity.user}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader className="bg-linear-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-primary">Company Settings</CardTitle>
                <CardDescription>
                  Manage your company preferences and configurations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Recruitment Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Default Interview Duration
                      </label>
                      <Input placeholder="45 minutes" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Hiring Workflow
                      </label>
                      <Input placeholder="Standard" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Approval Process
                      </label>
                      <Input placeholder="Manager + HR" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Candidate Feedback Delay
                      </label>
                      <Input placeholder="48 hours" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-semibold">Integration Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <LinkIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">ATS Integration</p>
                          <p className="text-sm text-muted-foreground">
                            Connect your Applicant Tracking System
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Configure email alerts and templates
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Company;
