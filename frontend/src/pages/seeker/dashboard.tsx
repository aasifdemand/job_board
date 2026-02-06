/* eslint-disable react-hooks/incompatible-library */
import { useState } from "react";
import {
  Search,
  Filter,
  Bell,
  Calendar,
  TrendingUp,
  MessageSquare,
  Clock,
  CheckCircle,
  MoreVertical,
  Download,
  Eye,
  Send,
  Paperclip,
  Smile,
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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// TanStack Table imports
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";

// Mock data for applications table
type Application = {
  id: string;
  company: string;
  position: string;
  appliedDate: string;
  status: "applied" | "interview" | "offer" | "rejected";
  nextStep: string;
  matchScore: number;
};

const applicationsData: Application[] = [
  {
    id: "1",
    company: "TechCorp Inc.",
    position: "Senior Frontend Developer",
    appliedDate: "2024-03-15",
    status: "interview",
    nextStep: "Technical Interview - Mar 25",
    matchScore: 92,
  },
  {
    id: "2",
    company: "DesignStudio",
    position: "UI/UX Designer",
    appliedDate: "2024-03-12",
    status: "applied",
    nextStep: "Awaiting response",
    matchScore: 87,
  },
  {
    id: "3",
    company: "StartupXYZ",
    position: "Full Stack Engineer",
    appliedDate: "2024-03-10",
    status: "interview",
    nextStep: "Final Round - Mar 28",
    matchScore: 95,
  },
  {
    id: "4",
    company: "ProductLabs",
    position: "Product Manager",
    appliedDate: "2024-03-05",
    status: "rejected",
    nextStep: "No further steps",
    matchScore: 76,
  },
  {
    id: "5",
    company: "CloudTech",
    position: "Backend Developer",
    appliedDate: "2024-03-03",
    status: "offer",
    nextStep: "Review offer",
    matchScore: 88,
  },
  {
    id: "6",
    company: "AnalyticsAI",
    position: "Data Scientist",
    appliedDate: "2024-02-28",
    status: "interview",
    nextStep: "Case Study - Mar 22",
    matchScore: 81,
  },
  {
    id: "7",
    company: "AppWorks",
    position: "Mobile Developer",
    appliedDate: "2024-02-25",
    status: "applied",
    nextStep: "Awaiting response",
    matchScore: 90,
  },
  {
    id: "8",
    company: "DataFlow Inc.",
    position: "DevOps Engineer",
    appliedDate: "2024-02-20",
    status: "rejected",
    nextStep: "No further steps",
    matchScore: 79,
  },
];

// Mock data for chats
const chatMessages = [
  {
    id: 1,
    sender: "recruiter",
    name: "Sarah Chen",
    role: "HR Manager",
    message: "Hi John, we were impressed with your resume!",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    sender: "recruiter",
    name: "Alex Rivera",
    role: "Tech Lead",
    message: "Can you share your availability for next week?",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    sender: "recruiter",
    name: "Maria Gonzalez",
    role: "Recruiter",
    message: "We'd like to proceed with the interview",
    time: "Mar 12",
    unread: true,
  },
  {
    id: 4,
    sender: "recruiter",
    name: "David Kim",
    role: "Hiring Manager",
    message: "Great interview! We'll get back soon",
    time: "Mar 10",
    unread: false,
  },
];

const SeekerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // TanStack Table columns definition
  const columns: ColumnDef<Application>[] = [
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {row.original.company.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.company}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.position}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "appliedDate",
      header: "Applied",
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.original.appliedDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const config = {
          applied: { label: "Applied", className: "bg-blue-100 text-blue-800" },
          interview: {
            label: "Interview",
            className: "bg-purple-100 text-purple-800",
          },
          offer: { label: "Offer", className: "bg-green-100 text-green-800" },
          rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
        }[status];

        return <Badge className={config.className}>{config.label}</Badge>;
      },
    },
    {
      accessorKey: "nextStep",
      header: "Next Step",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.nextStep}
        </div>
      ),
    },
    {
      accessorKey: "matchScore",
      header: "Match",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Progress value={row.original.matchScore} className="w-20 h-2" />
          <span className="font-medium">{row.original.matchScore}%</span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  // Initialize TanStack Table
  const table = useReactTable({
    data: applicationsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const stats = [
    {
      label: "Applications",
      value: "48",
      change: "+12%",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      label: "Interviews",
      value: "17",
      change: "+5%",
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      label: "Offers",
      value: "4",
      change: "+2%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Pending",
      value: "14",
      change: "-3%",
      icon: Clock,
      color: "text-amber-600",
    },
  ];

  const upcomingInterviews = [
    {
      company: "TechCorp Inc.",
      time: "Today, 2:00 PM",
      type: "Technical",
      interviewer: "Sarah Chen",
    },
    {
      company: "StartupXYZ",
      time: "Tomorrow, 11:00 AM",
      type: "Cultural Fit",
      interviewer: "Alex Rivera",
    },
    {
      company: "DesignStudio",
      time: "Mar 22, 10:00 AM",
      type: "Portfolio Review",
      interviewer: "Maria Gonzalez",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track your job search progress
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </Button>
          <Button className="gap-2">
            <Bell className="h-4 w-4" />
            Set Alerts
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600",
                    )}
                  >
                    {stat.change}
                  </p>
                </div>
                <stat.icon className={cn("h-8 w-8", stat.color)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applications Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>
                    Track all your job applications
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search applications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-48"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className="border-b bg-muted/50">
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="p-4 align-middle">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {table.getRowModel().rows.length} of{" "}
                  {applicationsData.length} applications
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Your scheduled interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{interview.company}</h4>
                        <p className="text-sm text-muted-foreground">
                          {interview.time}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {interview.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            with {interview.interviewer}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      <Button size="sm">Join</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Chats & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Chats */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Chats</CardTitle>
              <CardDescription>Messages from recruiters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chatMessages.map((chat) => (
                  <div
                    key={chat.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                      selectedChat === chat.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-accent",
                    )}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {chat.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{chat.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {chat.role}
                          </Badge>
                        </div>
                        {chat.unread && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {chat.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {chat.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                View All Messages
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Reply */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Reply</CardTitle>
              <CardDescription>Respond to recruiters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm">Sarah Chen</h4>
                    <p className="text-sm text-muted-foreground">
                      Looking forward to our interview tomorrow!
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your reply..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="min-h-25"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button className="gap-2" disabled={!messageInput.trim()}>
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Application Success Rate
                    </span>
                    <span className="font-bold">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Avg Response Time
                    </span>
                    <span className="font-bold">4.2 days</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Profile Completion
                    </span>
                    <span className="font-bold">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2">
                <Eye className="h-4 w-4" />
                View Analytics
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;
