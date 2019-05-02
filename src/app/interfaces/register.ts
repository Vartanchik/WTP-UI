export interface Register {
    UserName: string;
    Email: string;
    Passwords: {
        Password: string;
        ConfirmPassword: string;
    }
}