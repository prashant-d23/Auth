import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../Services/shared.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private auth:AuthService, private http:SharedService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

      console.log(this.signupForm.value);
      this.postData();
      this.sign_Up();
  }


  postData(){
    this.http.postDataToServer('users.json',this.signupForm.value).subscribe((res:any)=> {

    })
  }

  sign_Up(){

    const email = this.signupForm.value.email;
      const password = this.signupForm.value.password

      this.auth.signUp(email,password).subscribe((response:any)=>{
        console.log(response)
      },
      err => {
        console.log(err)
      })
  }

}
