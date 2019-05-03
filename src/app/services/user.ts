export interface User
{
    userName: string;
    email: string;
    photo: string;
    gender: {
        id: number;
        name: string;
    },
    dateOfBirth: string;
    country: {
        id: number;
        name: string;
    },
    steam: string,
    languages: []
    players: []
    teams: [],
    
}