import { cn } from "@/lib/utils";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

const RecruiterSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const mainNavItems = [
    { icon: Home, label: "Dashboard", href: "/recruiter" },
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

  const isActive = (href: string) => {
    if (href === "/recruiter") {
      return currentPath === href;
    }
    return currentPath.startsWith(href);
  };

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        {/* Logo */}
        <div className="p-6">
          <RecruiterLogo />
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "relative",
                        active &&
                          "bg-primary/5 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r",
                      )}
                    >
                      <a href={item.href} className="flex items-center gap-3">
                        <item.icon
                          className={cn("h-5 w-5", active && "text-primary")}
                        />
                        <span className={cn(active && "text-primary")}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics Navigation */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsNavItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "relative",
                        active &&
                          "bg-primary/5 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r",
                      )}
                    >
                      <a href={item.href} className="flex items-center gap-3">
                        <item.icon
                          className={cn("h-5 w-5", active && "text-primary")}
                        />
                        <span className={cn(active && "text-primary")}>
                          {item.label}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "relative",
                        active &&
                          "bg-primary/5 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r",
                      )}
                    >
                      <a href={item.href} className="flex items-center gap-3">
                        <item.icon
                          className={cn("h-5 w-5", active && "text-primary")}
                        />
                        <span className={cn(active && "text-primary")}>
                          {item.label}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default RecruiterSidebar;
