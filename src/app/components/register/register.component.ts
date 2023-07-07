import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm :FormGroup;

  constructor(
    private authService : AuthService,
    private formBuilder :FormBuilder,
    private toastrService :ToastrService
  ) {
  }

  ngOnInit(): void {
this.initForm();
  }

  initForm()
  {
    this.registerForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      password : ['',Validators.required],
    })
  }

  onSubmit()
  {
    if(this.registerForm.valid)
    {
        let data = Object.assign({},this.registerForm.value);
        this.authService.register(data).subscribe(res =>{
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
        errorResponse => {
          let err :ErrorResponseModel = errorResponse;

          this.toastrService.error(err.error.message,err.error.title);
        }
        )
    }
    else{
        this.toastrService.error("Please fill the form correctly");
    }
  }
}
