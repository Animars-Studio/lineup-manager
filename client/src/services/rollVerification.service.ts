import { jwtDecode } from "jwt-decode";
import { LocalStorageService } from "./localStorage.service";

export interface JwtPayload {
    aud: string;
    auth_time: number;
    'cognito:groups': string[];
    'cognito:username': string;
    'custom:assuming_username': string;
    email: string;
    email_verified: boolean;
    event_id: string;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    origin_jti: string;
    sub: string;
    token_use: string;
  }
  

export class RollVerificationService {
    
    private localStorageService:LocalStorageService

    constructor (localStorageService:LocalStorageService){
        this.localStorageService = localStorageService
    }

    decodedToken(token:string):JwtPayload {
        return jwtDecode(token);
    }

    isAdmin(){
        const token = this.localStorageService.getToken()
        if(token){
            const decoded = this.decodedToken(token)
            return decoded['cognito:groups'].includes('ADMIN');
        }
        return false
    }

    isSuperAdmin(){
        const token = this.localStorageService.getToken()
        if(token){
            const decoded = this.decodedToken(token)
            return decoded['cognito:groups'].includes('SUPER_ADMIN');
        }
        return false
    }

   
}