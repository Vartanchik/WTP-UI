export interface Register {
    userName: string;
    email: string;
    passwords: {
        password: string;
        confirmPassword: string;
    }
}
