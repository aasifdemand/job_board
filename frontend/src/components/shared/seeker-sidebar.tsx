import { useLocation, useNavigate } from "react-router-dom";
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
} from "../ui/sidebar";
import SeekerLogo from "./seeker-logo";
import {
  Home,
  Briefcase,
  LogOut,
  Search,
  FileText,
  Bookmark,
  TrendingUp,
  Calendar,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { useAuthStore } from "@/store/auth.store";

const SeekerSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const mainNavItems = [
    { icon: Home, label: "Dashboard", href: "/seeker" },
    { icon: Search, label: "Job Search", href: "/seeker/jobs", badge: 12 },
    {
      icon: Briefcase,
      label: "Applications",
      href: "/seeker/applications",
      badge: 3,
    },
    { icon: FileText, label: "Resume", href: "/seeker/resume" },
    { icon: Bookmark, label: "Saved Jobs", href: "/seeker/saved", badge: 8 },
  ];

  const secondaryNavItems = [
    { icon: TrendingUp, label: "Analytics", href: "/seeker/analytics" },
    {
      icon: Calendar,
      label: "Interviews",
      href: "/seeker/interviews",
      badge: 2,
    },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "Settings", href: "/seeker/settings" },
    { icon: HelpCircle, label: "Help", href: "/seeker/help" },
  ];

  const isActive = (href: string) => {
    if (href === "/seeker") {
      return currentPath === href;
    }
    return currentPath.startsWith(href);
  };

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        {/* Logo */}
        <div className="p-6">
          <SeekerLogo />
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
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

        {/* Secondary Navigation */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Insights</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => {
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

export default SeekerSidebar;
