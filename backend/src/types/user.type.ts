import { UserRole } from 'src/entities/user.entity';

export interface JwtUser {
    userId: string;
    email: string;
    role: UserRole;
}
