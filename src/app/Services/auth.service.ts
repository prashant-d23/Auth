import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../app-interface/auth-response.interface';
import { Subject, catchError, tap } from 'rxjs';
import { ErrorService } from './error.service';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private _errService:ErrorService) { }

  api_key:string = 'AIzaSyB9odmHwsADsNWKSLDxmxQBsm_KUOqVimQ'

  signUP_url : string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

  signUp(email:any,password:any){

    // this is copied from the forebase documentation for authentication of rest api
    //https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

   return this.http.post<AuthResponse>(`${this.signUP_url}${this.api_key}`,
    {email:email,
      password:password,
      returnSecureToken : true  //Request Body Payload
    }).pipe(
      catchError(err =>{
        return this._errService.handleError(err)
      })
    )
  }

  signIn_url:string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
  signIn(email:any,password:any){
    return this.http.post<AuthResponse>(`${this.signIn_url}${this.api_key}`,
    {email:email,
    password:password,
     returnSecureToken : true
    }).pipe(
      catchError(err =>{
        return this._errService.handleError(err)
      }),
      tap(res =>{
        this.authenticatedUser(res.email,res.localid,res.idToken, res.expiresIn)
      })
    )
  }



  user = new Subject<User>

  private authenticatedUser(email:string, userId:string, token:string, expiresIn:string){
    const expireationDate = new Date(new Date().getTime() + +expiresIn*1000);

    const user = new User(email, userId, token, expireationDate);
    this.user.next(user)
    console.log("user =>", user)
  }
}
