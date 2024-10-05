'use server';

import { Role } from '@prisma/client';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import prisma from '@/lib/db';
import SessionPayload from '@/types/SessionPayload';
import 'server-only';

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);
const sessionDuration =
    parseFloat(process.env.SESSION_DURATION || '1') * 1000 * 60 * 60 * 24;

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Date.now() + sessionDuration)
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    if (!session) return null;

    const verified = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
    });
    const payload = verified.payload as SessionPayload;

    if (payload) return { id: payload.id, role: payload.role };

    return null;
}

export async function createSession(id: string, role: Role) {
    const expires = new Date(Date.now() + sessionDuration);
    const session = await encrypt({ id, role });

    cookies().set('Authorization', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires,
        sameSite: 'lax',
        path: '/',
    });
}

export async function updateSession() {
    const session = cookies().get('Authorization')?.value;
    const payload = await decrypt(session);

    if (!payload) return null;

    await createSession(payload.id, payload.role);
}

export async function deleteSession() {
    cookies().delete('Authorization');
}

export async function getSessionDetail() {
    const session = cookies().get('Authorization')?.value;
    const payload = await decrypt(session);

    if (payload) {
        const user = await prisma.user.findUnique({
            where: { id: payload.id, deletedAt: null },
            select: { email: true, role: true },
        });

        if (!user) return null;

        return { email: user.email, role: user.role };
    }

    return null;
}
