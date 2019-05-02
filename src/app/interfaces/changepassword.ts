export interface ChangePassword{
    Passwords: {
        CurrentPassword: string;
        NewPassword: string;
        ConfirmPassword : string;
    }
}