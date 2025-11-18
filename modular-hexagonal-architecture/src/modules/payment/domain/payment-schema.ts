import z from "zod";

export const paymentSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
});

export type Payment = z.infer<typeof paymentSchema>;
