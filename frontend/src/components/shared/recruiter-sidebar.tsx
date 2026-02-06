import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import RecruiterLogo from "./recruiter-logo";
import {
  Home,
  Briefcase,
  LogOut,
  Users,
  Building,
  FileText,
  TrendingUp,
  Settings,
  HelpCircle,
  DollarSign,
  BarChart3,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RecruiterSidebar = () => {
  const mainNavItems = [
    { icon: Home, label: "Dashboard", href: "/recruiter", active: true },
    {
      icon: Briefcase,
      label: "Job Postings",
      href: "/recruiter/jobs",
      badge: 5,
    },
    {
      icon: Users,
      label: "Candidates",
      href: "/recruiter/candidates",
      badge: 12,
    },
    {
      icon: UserCheck,
      label: "Interviews",
      href: "/recruiter/interviews",
      badge: 3,
    },
    { icon: Building, label: "Company", href: "/recruiter/company" },
    {
      icon: FileText,
      label: "Applications",
      href: "/recruiter/applications",
      badge: 24,
    },
  ];

  const analyticsNavItems = [
    { icon: TrendingUp, label: "Analytics", href: "/recruiter/analytics" },
    { icon: BarChart3, label: "Reports", href: "/recruiter/reports" },
    { icon: DollarSign, label: "Billing", href: "/recruiter/billing" },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "Settings", href: "/recruiter/settings" },
    { icon: HelpCircle, label: "Help", href: "/recruiter/help" },
  ];

  return (
    <Sidebar className="w-64 shrink-0 border-r bg-card">
      <SidebarContent className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-4 pb-4">
          <RecruiterLogo />
        </div>

        <Separator className="mb-4" />

        {/* Main Navigation */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "group relative w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200",
                      item.active
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <a href={item.href}>
                      <item.icon
                        className={cn(
                          "mr-3 h-4 w-4",
                          item.active
                            ? "text-primary-foreground"
                            : "text-muted-foreground group-hover:text-accent-foreground",
                        )}
                      />
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant={item.active ? "secondary" : "outline"}
                          className={cn(
                            "ml-auto text-xs",
                            item.active
                              ? "bg-background text-foreground"
                              : "bg-primary/10 text-primary",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics Navigation */}
        <SidebarGroup className="px-4 mt-4">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {analyticsNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className="group w-full justify-start px-3 py-2.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <a href={item.href}>
                      <item.icon className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <div className="mt-auto p-4 border-t">
          <SidebarMenu className="space-y-1">
            {bottomNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  className="group w-full justify-start px-3 py-2.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <a href={item.href}>
                    <item.icon className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="group w-full justify-start px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <a href="/logout">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Logout</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default RecruiterSidebar;
