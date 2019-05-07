export interface TokenResponse {
    accessToken: Token;
    message?: string;
}

export interface Token {
    token: string;
    expiration: string;
    refresh_token: string;
    role: string;
    userName: string;
    photo: string;
}
