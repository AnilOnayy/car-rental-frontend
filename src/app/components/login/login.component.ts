import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm :FormGroup;

  constructor(
    private formBuilder :FormBuilder,
    private toastrService : ToastrService,
    private authService :AuthService,
    private router :Router
  ) { }


  ngOnInit(): void {
    this.initForm();
  }


  initForm()
  {
    this.loginForm = this.formBuilder.group({
      email :['',Validators.required],
      password :['',Validators.required]
    })
  }

  onSubmit()
  {
    if(this.loginForm.valid)
    {
      var data = Object.assign({},this.loginForm.value) ;
      this.authService.login(data).subscribe(res => {

          let storage = {
            firstName : res.data.firstName,
            lastName : res.data.lastName,
            token : res.data.token,
            expiration : res.data.expiration,
            email : res.data.email,
          }
          localStorage.setItem("login", JSON.stringify(storage));

          this.toastrService.success("Log in successfully");
          window.location.reload();
      },
      errors => {
        let err : ErrorResponseModel = errors;
        this.toastrService.error(err.error.message,err.error.title);

      }

      );
    }
    else{
      this.toastrService.error("Please fill the form.");
    }
  }

}
