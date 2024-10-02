import { PrismaClient } from '@prisma/client';

function createPrismaClient() {
    return new PrismaClient();
}

declare const globalThis: {
    prisma: ReturnType<typeof createPrismaClient>;
} & typeof global;

const prisma = globalThis.prisma ?? createPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
