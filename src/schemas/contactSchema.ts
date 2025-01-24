import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email(),
  phone: z.string().min(1, 'Phone number is required.'),
});
