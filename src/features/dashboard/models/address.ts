import { z } from "zod";

export const addressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    pincode: z.string().min(4, "Pincode is required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
