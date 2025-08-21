import { User } from "../User";

export interface AuthResponse {
    code : number,
    message: string,
    result: AuthResult
}

export interface AuthResult{
    token: string,
    authenticated: boolean,
    user: User
}

// {
//     "code": 0,
//     "message": "Log-in successfully!",
//     "result": {
//         "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1NTg5MzMzNywiaWF0IjoxNzU1Njc3MzM3LCJqdGkiOiIwOTYxNzA0Zi05OTRmLTRiZDEtYjJlMS1hMzBiMTNkZjM3ODkiLCJzY29wZSI6IiJ9.Dp7kuMbT1y7lHcpg_Ga2FOq1wQJGR3aevFEMxewaY5B4HK4ZkZtk_6AwbqrGObSzdd7NmMRVB1Wlgfntrl9vOg",
//         "authenticated": true
//     }
// }