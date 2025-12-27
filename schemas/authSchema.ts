import { z } from "zod";

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(3, "Email or Username is required"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters"),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
