import { z } from "zod";

export const userProfileSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name is required and must be at least 2 characters long." })
        .max(50, { message: "Name must not exceed 50 characters." }),

    email: z
        .string()
        .email({ message: "Invalid email address. Please provide a valid email." }),

    phone: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits." })
        .max(15, { message: "Phone number must not exceed 15 digits." })
        .regex(/^\d+$/, { message: "Phone number must contain only digits." }),

});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
