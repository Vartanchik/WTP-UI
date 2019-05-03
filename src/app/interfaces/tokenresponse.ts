export interface Tokenresponse {
    accessToken: {
        token: string;
        expiration: string;
        refresh_token: string;
        role: string;
        userName: string;
        photo: string;
    }
}
