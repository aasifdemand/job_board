import { z } from "zod";

export const verifyAccountSchema = z.object({
    otp: z
        .string()
        .length(6, "Verification code must be 6 digits"),
});

export type VerifyAccountFormValues = z.infer<
    typeof verifyAccountSchema
>;
