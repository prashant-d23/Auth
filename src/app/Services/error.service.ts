import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(err:HttpErrorResponse){
     // this.error = err.error.error.message;
     console.log(err)
     if(!err.error || !err.error.error.message){
      return throwError("UNKNOWN")
    }else{
       return throwError(err.error.error.message)

     }
   }


  errorMsgs = {
    UNKNOWN : "An Unknow Error is Occured",
    EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted.",
    INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
    INVALID_EMAIL: "The Email is invalid or the user does not exist.",
    USER_DISABLED: "The user account has been disabled by an administrator.",
    EMAIL_EXISTS: "The email address is already in use by another account.",
    OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later."
  }
}
