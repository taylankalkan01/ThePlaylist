import { z } from "zod";

export const createPlanInput = z.object({
  planType: z.string({
    required_error: "Plan type is required",
    invalid_type_error: "Plan type must be a string"
  }),
  price: z.string({
    required_error: "price is required",
    invalid_type_error: "price must be a string"
  }),
  isActive: z
    .boolean({
      required_error: "isActive is required",
      invalid_type_error: "isActive must be a boolean"
    })
    .default(false)
});
