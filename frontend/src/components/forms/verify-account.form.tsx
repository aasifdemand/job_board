/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/incompatible-library */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyAccountSchema,
  type VerifyAccountFormValues,
} from "@/schemas/verify-account.schema";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";

export function VerifyAccountForm(props: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const location = useLocation();
  const verifyAccount = useAuthStore((s) => s.verifyAccount);
  const { loading } = useAuthStore();
  const email = location?.state?.email;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VerifyAccountFormValues>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const otp = watch("otp");

  // In VerifyAccountForm component
  const onSubmit = async (data: VerifyAccountFormValues) => {
    try {
      await verifyAccount(data.email, data.otp);
      toast.success("Account verified successfully 🎉");
      setTimeout(() => {
        navigate("/auth/login", {
          state: { email: data.email },
        });
      }, 1000);
    } catch (err: any) {
      // Handle different error response formats
      let errorMessage = "Verification failed";

      if (err?.response?.data) {
        // Case 1: { message: string }
        if (typeof err.response.data.message === "string") {
          errorMessage = err.response.data.message;
        }
        // Case 2: { message: { message: string } } - your current format
        else if (err.response.data.message?.message) {
          errorMessage = err.response.data.message.message;
        }
        // Case 3: { message: string[] }
        else if (Array.isArray(err.response.data.message)) {
          errorMessage = err.response.data.message[0];
        }
      }

      toast.error(errorMessage);
    }
  };

  const handleResend = async () => {
    const email = watch("email");

    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      // You'll need to implement this in your auth store
      // await useAuthStore.getState().resendVerification(email);
      toast.success("Verification code resent!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to resend code");
    }
  };

  return (
    <Card {...props} className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verify your account</CardTitle>
        <CardDescription>
          Enter your email and the 6-digit code sent to you
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* OTP Input */}
          <div className="flex flex-col items-center gap-2">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) =>
                setValue("otp", value, { shouldValidate: true })
              }
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {errors.otp && (
              <p className="text-sm text-red-500">{errors.otp.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify Account"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={handleResend}
            >
              Resend code
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Entered the wrong email?{" "}
              <Link to="/auth/signup" className="underline">
                Go back
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
