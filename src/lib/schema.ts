import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  industry: z.string().min(2, "Industry is required"),
  role: z.string().min(2, "Role is required"),
  goals: z.array(z.string()).min(1, "At least one goal is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
});

export type Inputs = z.infer<typeof formSchema>;
