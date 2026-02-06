/* eslint-disable react-hooks/incompatible-library */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { Link } from "react-router-dom";

export function VerifyAccountForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerifyAccountFormValues>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otp = watch("otp");

  const onSubmit = (data: VerifyAccountFormValues) => {
    console.log("OTP Verified:", data);
  };

  const handleResend = () => {
    console.log("Resend verification code");
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Verify your account</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
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
              disabled={isSubmitting || otp.length !== 6}
            >
              Verify Account
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
