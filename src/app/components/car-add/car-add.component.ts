import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { CarService } from 'src/app/services/car.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit{

  formGroup :FormGroup;
  brands : Brand[];
  colors : Color[];


  constructor(
    private dataSharingService :DataSharingService,
    private formBuilder :FormBuilder,
    private carService :CarService,
    private toastrService : ToastrService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.dataSharingService.brands$.subscribe(brands => {
      this.brands = brands;
    })
    this.dataSharingService.colors$.subscribe(colors => {
      this.colors = colors;
    })

  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      description : [ '',Validators.required ],
      brandId : [ '',Validators.required ],
      colorId : [ '',Validators.required ],
      modelYear : [ '',Validators.required ],
      dailyPrice : [ '',Validators.required ],

    })
  }

  onSubmit()
  {
    if(this.formGroup.valid)
    {
      let form =  Object.assign( {}, this.formGroup.value );

      this.carService.add(form).subscribe(res => {

        this.toastrService.success(res.message,res.title);
        this.router.navigateByUrl(`/cars/${res.data.id}`);
        this.formGroup.reset();
      },
      error => {
        let err  : ErrorResponseModel = error;
        this.toastrService.error(err.error.message,err.error.title);
      }
      )
    }else{
      this.toastrService.error("Form is not valid.","Invalid Data");
    }
  }


}
