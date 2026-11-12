import type { User } from "@/interfaces/user.interface";

// login, register y checkstatus
export interface AuthResponse {
    user:  User;
    token: string;
}

