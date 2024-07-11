export class LocalStorageService {
    constructor(){}

    //Save token in localStorage
    logIn(token:string){
        window.localStorage.setItem("app_user_token",token)
    }

    //Remove token from localStorage
    logOff(){
        window.localStorage.removeItem("app_user_token")
    }

    //Get token from localStogare
    getToken(): string | null {
        return window.localStorage.getItem("app_user_token");
    }

    //Verify if user is authenticated 
    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

}