import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Filter,
  X,
  Check,
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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Jobs = () => {
  const [salaryRange, setSalaryRange] = useState([40000, 120000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "full-time",
    "remote",
  ]);
  const [selectedExperience, setSelectedExperience] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const jobTypes = [
    { id: "full-time", label: "Full-time" },
    { id: "part-time", label: "Part-time" },
    { id: "contract", label: "Contract" },
    { id: "internship", label: "Internship" },
    { id: "remote", label: "Remote" },
    { id: "hybrid", label: "Hybrid" },
  ];

  const experienceLevels = [
    { id: "entry", label: "Entry Level" },
    { id: "mid", label: "Mid Level" },
    { id: "senior", label: "Senior Level" },
    { id: "lead", label: "Lead / Manager" },
  ];

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Marketing",
    "Design",
    "Education",
    "Sales",
    "Engineering",
  ];

  const sampleJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Inc.",
      logo: "TC",
      location: "San Francisco, CA",
      salary: "$90,000 - $130,000",
      type: "Full-time",
      experience: "Mid Level",
      posted: "2 days ago",
      remote: true,
      featured: true,
      tags: ["React", "TypeScript", "Next.js", "Tailwind"],
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignStudio",
      logo: "DS",
      location: "Remote",
      salary: "$75,000 - $110,000",
      type: "Full-time",
      experience: "Mid Level",
      posted: "1 week ago",
      remote: true,
      featured: false,
      tags: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataSystems",
      logo: "DS",
      location: "New York, NY",
      salary: "$100,000 - $150,000",
      type: "Full-time",
      experience: "Senior Level",
      posted: "3 days ago",
      remote: false,
      featured: true,
      tags: ["Node.js", "Python", "AWS", "PostgreSQL"],
    },
    {
      id: 4,
      title: "Product Manager",
      company: "ProductLabs",
      logo: "PL",
      location: "Austin, TX",
      salary: "$120,000 - $160,000",
      type: "Full-time",
      experience: "Senior Level",
      posted: "5 days ago",
      remote: true,
      featured: false,
      tags: ["Agile", "Product Strategy", "User Stories", "Roadmapping"],
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudTech",
      logo: "CT",
      location: "Remote",
      salary: "$95,000 - $140,000",
      type: "Contract",
      experience: "Mid Level",
      posted: "1 day ago",
      remote: true,
      featured: true,
      tags: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "AnalyticsAI",
      logo: "AA",
      location: "Boston, MA",
      salary: "$110,000 - $155,000",
      type: "Full-time",
      experience: "Senior Level",
      posted: "4 days ago",
      remote: false,
      featured: false,
      tags: ["Python", "Machine Learning", "SQL", "Statistics"],
    },
  ];

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId],
    );
  };

  const clearFilters = () => {
    setSalaryRange([40000, 120000]);
    setSelectedTypes(["full-time", "remote"]);
    setSelectedExperience("all");
    setSearchQuery("");
    setLocation("");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Find Your Dream Job
        </h1>
        <p className="text-muted-foreground mt-2">
          Discover {sampleJobs.length}+ opportunities that match your skills
        </p>
      </div>

      {/* Main Search Bar */}
      <Card className="mb-6 shadow-sm border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="h-10 bg-primary hover:bg-primary/90">
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <Card className="sticky top-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Filters</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs h-8"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Job Type Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={selectedTypes.includes(type.id)}
                        onCheckedChange={() => handleTypeToggle(type.id)}
                      />
                      <Label
                        htmlFor={type.id}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Salary Range Filter */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold">Salary Range</h3>
                  <span className="text-xs text-primary font-medium">
                    ${salaryRange[0].toLocaleString()} - $
                    {salaryRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                  min={30000}
                  max={200000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>$30k</span>
                  <span>$200k</span>
                </div>
              </div>

              <Separator />

              {/* Experience Level Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Experience Level</h3>
                <Select
                  value={selectedExperience}
                  onValueChange={setSelectedExperience}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Industry Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Industry</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      Select Industries
                      <Filter className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Industries</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {industries.map((industry) => (
                      <DropdownMenuItem key={industry}>
                        <Check className="mr-2 h-4 w-4" />
                        {industry}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="lg:w-3/4">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                {sampleJobs.length} Jobs Found
              </h2>
              <p className="text-sm text-muted-foreground">
                Sorted by:{" "}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 h-8 inline-flex">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="salary">Highest Salary</SelectItem>
                    <SelectItem value="relevance">Relevance</SelectItem>
                  </SelectContent>
                </Select>
              </p>
            </div>

            <Tabs defaultValue="all" className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All Jobs</TabsTrigger>
                <TabsTrigger value="remote">Remote</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedTypes.map((type) => (
              <Badge
                key={type}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                {jobTypes.find((t) => t.id === type)?.label}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => handleTypeToggle(type)}
                />
              </Badge>
            ))}
            {selectedExperience !== "all" && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                {
                  experienceLevels.find((l) => l.id === selectedExperience)
                    ?.label
                }
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              ${salaryRange[0].toLocaleString()}+
            </Badge>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleJobs.map((job) => (
              <Card
                key={job.id}
                className={`hover:shadow-lg transition-shadow duration-200 cursor-pointer border ${
                  job.featured ? "border-primary/30" : "border-border"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {job.logo}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription>{job.company}</CardDescription>
                      </div>
                    </div>
                    {job.featured && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        <Star className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {job.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-background"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {job.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                      <Badge
                        variant={job.remote ? "default" : "secondary"}
                        className="w-fit"
                      >
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline" className="w-full sm:w-auto">
              Load More Jobs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
