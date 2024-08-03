import { jwtDecode } from "jwt-decode";
import { LocalStorageService } from "./localStorage.service";

export interface JwtPayload {
  sub: string;
  email_verified: boolean;
  "custom:assuming_username": string;
  iss: string;
  "cognito:username": string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  email: string;
}


export class RoleVerificationService {
  private localStorageService: LocalStorageService;

  constructor(localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService;
  }

  decodedToken(token: string): JwtPayload {
    return jwtDecode(token);
  }

  getUsername (){
    const token = this.localStorageService.getToken();
        if (token) {
      const decoded = this.decodedToken(token);
      return decoded["cognito:username"]
    }
    return false;
  }

  getEmail (){
    const token = this.localStorageService.getToken();
        if (token) {
      const decoded = this.decodedToken(token);
      return decoded.email
    }
    return false;
  }

  
  // isAdmin() {
  //   const token = this.localStorageService.getToken();
  //   if (token) {
  //     const decoded = this.decodedToken(token);
  //     return decoded["cognito:groups"].includes("ADMIN");
  //   }
  //   return false;
  // }

  // isSuperAdmin() {
  //   const token = this.localStorageService.getToken();
  //   if (token) {
  //     const decoded = this.decodedToken(token);
  //     //return decoded["cognito:groups"].includes("SUPER_ADMIN");
  //   }
  //   return false;
  // }
}
