import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ErrorService } from '../Services/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  loginMode:boolean = true;
  loginForm!:FormGroup;
  error:any;
  errMsgs:any = this._errService.errorMsgs;
  constructor(private fb:FormBuilder, private auth:AuthService, private _errService:ErrorService, private router:Router){}

  ngOnInit(){
      this.loginForm = this.fb.group({
        "email" : ['',[Validators.required, Validators.email]],
        'password' : ['',[Validators.required, Validators.minLength]]
      })
  }
  onModeSwitch(){
    this.loginMode = !this.loginMode
  }
  submit(){
    console.log(this.loginForm.value)

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password

    this.auth.signIn(email,password).subscribe((response:any)=>{
      console.log("SignIn_Response: ",response);
    },
    err =>{
      //  this.error = err
      this.error = this.errMsgs[err]
    })

    this.router.navigate(['/dashboard'])
  }

}
