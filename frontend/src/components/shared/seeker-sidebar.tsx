import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
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
  Star,
} from "lucide-react";
import { Badge } from "../ui/badge";

const SeekerSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
    { icon: Star, label: "Recommended", href: "/seeker/recommended" },
  ];

  const bottomNavItems = [
    { icon: Settings, label: "Settings", href: "/seeker/settings" },
    { icon: HelpCircle, label: "Help", href: "/seeker/help" },
  ];

  // Check if current path matches the href or is a sub-route
  const isActive = (href: string) => {
    if (href === "/seeker") {
      return currentPath === href;
    }
    return currentPath.startsWith(href);
  };

  return (
    <Sidebar className="w-64 shrink-0 border-r bg-card">
      <SidebarContent className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-4 pb-4">
          <SeekerLogo />
        </div>

        <Separator className="mb-4" />

        {/* Main Navigation */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "group relative w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200",
                        active
                          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <a href={item.href}>
                        <item.icon
                          className={cn(
                            "mr-3 h-4 w-4",
                            active
                              ? "text-primary-foreground"
                              : "text-muted-foreground group-hover:text-accent-foreground",
                          )}
                        />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant={active ? "secondary" : "outline"}
                            className={cn(
                              "ml-auto text-xs",
                              active
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
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup className="px-4 mt-2">
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Insights
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryNavItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "group w-full justify-start px-3 py-2.5 rounded-lg transition-colors",
                        active
                          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <a href={item.href}>
                        <item.icon
                          className={cn(
                            "mr-3 h-4 w-4",
                            active
                              ? "text-primary-foreground"
                              : "text-muted-foreground group-hover:text-accent-foreground",
                          )}
                        />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant={active ? "secondary" : "outline"}
                            className={cn(
                              "ml-auto text-xs",
                              active
                                ? "bg-background text-foreground"
                                : "bg-primary/10 text-primary border-primary/20",
                            )}
                          >
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
        <div className="mt-auto p-4 border-t">
          <SidebarMenu className="space-y-1">
            {bottomNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "group w-full justify-start px-3 py-2.5 rounded-lg transition-colors",
                      active
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <a href={item.href}>
                      <item.icon
                        className={cn(
                          "mr-3 h-4 w-4",
                          active
                            ? "text-primary-foreground"
                            : "text-muted-foreground group-hover:text-accent-foreground",
                        )}
                      />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}

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

export default SeekerSidebar;
