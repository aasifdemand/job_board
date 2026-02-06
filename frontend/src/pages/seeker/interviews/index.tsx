import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Building,
  ChevronRight,
  CheckCircle,
  MoreVertical,
  Search,
  Filter,
  Plus,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "react-resizable-panels";

const Interviews = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const interviews = [
    {
      id: 1,
      title: "Technical Interview - Frontend",
      company: "TechCorp Inc.",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      type: "video",
      status: "confirmed",
      interviewer: "Sarah Chen (Senior Engineer)",
      preparation: "React, System Design, Algorithms",
    },
    {
      id: 2,
      title: "Cultural Fit Interview",
      company: "StartupXYZ",
      date: "Tomorrow",
      time: "11:00 AM - 12:00 PM",
      type: "phone",
      status: "confirmed",
      interviewer: "Alex Rivera (HR Manager)",
      preparation: "Company Values, Past Experience",
    },
    {
      id: 3,
      title: "On-site Interview",
      company: "DesignStudio",
      date: "Nov 15",
      time: "10:00 AM - 1:00 PM",
      type: "onsite",
      status: "pending",
      interviewer: "Multiple Team Members",
      preparation: "Portfolio Review, Whiteboarding",
    },
    {
      id: 4,
      title: "Final Round",
      company: "ProductLabs",
      date: "Nov 18",
      time: "3:00 PM - 4:30 PM",
      type: "video",
      status: "confirmed",
      interviewer: "CEO & CTO",
      preparation: "Product Strategy, Leadership",
    },
  ];

  const pastInterviews = [
    {
      id: 5,
      title: "Screening Interview",
      company: "CloudTech",
      date: "Nov 5",
      time: "Completed",
      type: "video",
      status: "completed",
      result: "passed",
      feedback: "Positive - Advanced to next round",
    },
    {
      id: 6,
      title: "Technical Assessment",
      company: "AnalyticsAI",
      date: "Nov 3",
      time: "Completed",
      type: "onsite",
      status: "completed",
      result: "failed",
      feedback: "Need improvement in system design",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "onsite":
        return <MapPin className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string, result?: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Confirmed
          </Badge>
        );
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "completed":
        return result === "passed" ? (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Passed
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Not Passed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your upcoming interviews
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search interviews..." className="pl-10 w-48" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Interview
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold mt-2">4</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold mt-2">8</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold mt-2">62%</p>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming (4)</TabsTrigger>
          <TabsTrigger value="past">Past (8)</TabsTrigger>
          <TabsTrigger value="preparation">Preparation</TabsTrigger>
        </TabsList>

        {/* Upcoming Interviews */}
        <TabsContent value="upcoming" className="space-y-4">
          {interviews.map((interview) => (
            <Card
              key={interview.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg">{interview.title}</h3>
                      {getStatusBadge(interview.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {interview.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {interview.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {interview.time}
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(interview.type)}
                        <span className="capitalize">{interview.type}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Interviewer</p>
                      <p className="text-sm">{interview.interviewer}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Preparation Needed</p>
                      <p className="text-sm text-muted-foreground">
                        {interview.preparation}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-40">
                    <Button className="w-full gap-2">
                      <Video className="h-4 w-4" />
                      Join Interview
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <ChevronRight className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Past Interviews */}
        <TabsContent value="past" className="space-y-4">
          {pastInterviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg">{interview.title}</h3>
                      {getStatusBadge(interview.status, interview.result)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {interview.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {interview.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {interview.time}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Feedback</p>
                      <p className="text-sm text-muted-foreground">
                        {interview.feedback}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Preparation */}
        <TabsContent value="preparation">
          <Card>
            <CardHeader>
              <CardTitle>Interview Preparation</CardTitle>
              <CardDescription>
                Resources and tips for your upcoming interviews
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Common Questions to Practice</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Tell me about yourself and your experience
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Why do you want to work at our company?
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Describe a challenging project you worked on
                  </li>
                </ul>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">Technical Preparation</h4>
                <p className="text-sm text-muted-foreground">
                  Review: React hooks, system design principles, algorithm
                  complexity, and your past project implementations.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Preparation Guide
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Interviews;
