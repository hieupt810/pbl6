import { z } from 'zod';

export const RegisterSchema = z
    .object({
        email: z.string().trim().email('Invalid email address.'),
        password: z
            .string()
            .trim()
            .min(6, { message: 'Password must be at least 6 characters.' })
            .max(32, { message: 'Password must be less than 32 characters.' })
            .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
            .regex(/[0-9]/, { message: 'Contain at least one number.' }),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

export type RegisterType = z.infer<typeof RegisterSchema>;
