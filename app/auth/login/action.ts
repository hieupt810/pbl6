'use server';

import { compare } from 'bcrypt-ts';

import prisma from '@/lib/db';
import { LoginSchema } from '@/types/LoginSchema';
import { ResponseType } from '@/types/ResponseSchema';
import { createSession } from '@/utils/session';

export default async function loginHandler(
    data: FormData,
): Promise<ResponseType> {
    const formData = Object.fromEntries(data.entries());
    const parsed = LoginSchema.safeParse(formData);

    if (!parsed.success) {
        return { status: 400, message: 'Invalid data' };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: parsed.data.email, deletedAt: null },
            select: { id: true, password: true, role: true },
        });

        if (!user) {
            return { status: 400, message: 'Invalid email or password' };
        }

        const match = await compare(parsed.data.password, user.password);

        if (!match) {
            return { status: 400, message: 'Invalid email or password' };
        }

        await createSession(user.id, user.role);

        return { status: 200 };
    } catch (error) {
        return { status: 500, message: 'Internal server error' };
    }
}
