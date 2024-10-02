import { z } from 'zod';

export const ResponseSchema = z.object({
    status: z.number(),
    message: z.string().trim().nullish(),
});

export type ResponseType = z.infer<typeof ResponseSchema>;
