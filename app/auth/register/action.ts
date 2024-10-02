'use server';

import { hash } from 'bcrypt-ts';

import prisma from '@/lib/db';
import { RegisterSchema } from '@/types/RegisterSchema';
import { ResponseType } from '@/types/ResponseSchema';

export default async function registerHandler(
    data: FormData,
): Promise<ResponseType> {
    const formData = Object.fromEntries(data.entries());
    const parsed = RegisterSchema.safeParse(formData);

    if (!parsed.success) {
        return { status: 400, message: 'Invalid registration data.' };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: parsed.data.email },
            select: { id: true },
        });

        if (user) return { status: 400, message: 'Email is already in use.' };

        const hashPassword = await hash(parsed.data.password, 10);

        await prisma.user.create({
            data: { email: parsed.data.email, password: hashPassword },
        });

        return { status: 200, message: 'User registered successfully.' };
    } catch (error) {
        return { status: 500, message: 'An uncaught error occurred.' };
    }
}
