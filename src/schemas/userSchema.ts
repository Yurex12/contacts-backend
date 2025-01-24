import { z } from 'zod';

export const userSchema = z.object({
  username: z
    .string()
    .min(1, 'username is required.')
    .min(3, 'username must be more than 3 characters.'),
  email: z.string().min(1, 'username is required.').email(),
  password: z
    .string()
    .min(1, 'password is required.')
    .min(6, 'password must not be at least  6 characters'),
});
