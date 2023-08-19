import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
  repeatPassword: z.string().nonempty(),
});

export { SignUpSchema };
