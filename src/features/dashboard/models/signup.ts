import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .nonempty("Name is required"),

    phone: z
        .string()
        .trim()
        .min(10, "Phone must be at least 10 digits")
        .regex(/^\d+$/, "Phone must contain only digits"),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    address: z.object({
        street: z
            .string()
            .trim()
            .min(1, "Street is required"),

        city: z
            .string()
            .trim()
            .min(1, "City is required"),

        pincode: z
            .string()
            .trim()
            .min(4, "Pincode must be at least 4 characters")
            .regex(/^\d+$/, "Pincode must contain only digits"),
    }),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
