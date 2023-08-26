import { z } from "zod";

const RecoveryPasswordSchema = z.object({
  code: z.string().nonempty(),
  password: z.string().nonempty(),
  repeatPassword: z.string().nonempty(),
});

export { RecoveryPasswordSchema };
