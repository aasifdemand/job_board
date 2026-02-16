import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const GoogleCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const setAuthFromToken = useAuthStore((s) => s.setAuthFromToken);

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      navigate("/auth/login");
      return;
    }

    setAuthFromToken(token);

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.isOnboarded) {
      navigate("/onboarding");
    } else if (payload.role === "recruiter") {
      navigate("/recruiter");
    } else {
      navigate("/seeker");
    }
  }, [params, navigate, setAuthFromToken]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Signing you in...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    </main>
  );
};

export default GoogleCallback;
