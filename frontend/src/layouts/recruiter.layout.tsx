import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Bell, Plus, Users } from "lucide-react";
import RecruiterSidebar from "@/components/shared/recruiter-sidebar";

const RecruiterLayout = () => {
  const notifications = 5;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        <RecruiterSidebar />

        {/* Main Area */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 z-40 h-16 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex items-center gap-4 px-6">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search candidates, skills, or jobs..."
                className="pl-10 pr-4 h-10 bg-accent border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-accent"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-semibold">
                    {notifications}
                  </span>
                )}
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                <Users className="h-4 w-4" />
                Find Candidates
              </Button>

              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                <Plus className="h-4 w-4" />
                Post Job
              </Button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 w-full p-6 overflow-y-auto">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="border-t px-6 py-4 bg-card/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span>
                  © {new Date().getFullYear()} JobGeek. Hiring smarter, building
                  careers.
                </span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="hover:text-foreground transition-colors hover:underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-foreground transition-colors hover:underline"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-foreground transition-colors hover:underline"
                >
                  Help Center
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RecruiterLayout;
