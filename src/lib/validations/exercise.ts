import { z } from "zod"

export const exerciseFormSchema = z.object({
  sets: z.coerce.number({ invalid_type_error: "Please Enter a Valid Number" }),
  reps: z.coerce.number({ invalid_type_error: "Please Enter a Valid Number" }),
})
