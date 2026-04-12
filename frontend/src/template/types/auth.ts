export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginData {
    email: string;
    password?: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
}
