import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().trim().email('Invalid email address.'),
    password: z
        .string()
        .trim()
        .min(6, {
            message: 'Password must be at least 6 characters.',
        })
        .max(32, {
            message: 'Password must be less than 32 characters.',
        }),
});

export type LoginType = z.infer<typeof LoginSchema>;
