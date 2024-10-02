import { Role } from '@prisma/client';
import { JWTPayload } from 'jose';

interface SessionPayload extends JWTPayload {
    id: string;
    role: Role;
}

export default SessionPayload;
