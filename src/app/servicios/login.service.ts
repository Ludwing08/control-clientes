import { Injectable } from "@angular/core";
import { Auth, authState } from "@angular/fire/auth";
import { map } from "@firebase/util";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


@Injectable()
export class LoginService{
    constructor(private authService: Auth){}

    registro(email:string, password:string){
        return createUserWithEmailAndPassword(this.authService,email,password);
    }

    login(email:string, password:string){
        return signInWithEmailAndPassword(this.authService, email,password);
    }

    getAuth(){
        return authState(this.authService);
    }

    logout(){
        signOut(this.authService);
    }
}