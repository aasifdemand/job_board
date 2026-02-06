import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SeekerLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      {/* Logo Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/90 shadow-lg">
        <Briefcase className="w-6 h-6 text-primary-foreground" />
      </div>

      {/* Logo Text and Badge */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-primary leading-tight">
          JobGeek
        </h1>
        <Badge
          variant="secondary"
          className="w-fit mt-1 text-xs font-normal bg-primary/10 text-primary hover:bg-primary/20"
        >
          Job Seeker
        </Badge>
      </div>
    </div>
  );
};

export default SeekerLogo;
