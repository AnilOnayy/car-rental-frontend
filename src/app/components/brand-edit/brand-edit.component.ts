import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { BrandService } from 'src/app/services/brand.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})

export class BrandEditComponent implements OnInit {

  formGroup : FormGroup;
  brands  : Brand[];
  currentBrand : Brand = {brandId:0,brandName : ""};
  brandId : number;

  constructor(
    private dataSharingService :DataSharingService,
    private formBuilder :FormBuilder,
    private toastrService :ToastrService,
    private brandService : BrandService,
    private activatedRoute :ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"])
      {
        this.getBrand(params["brandId"]);
      }
    })

    this.initializeForm();

    this.dataSharingService.brands$.subscribe(brands => {
      this.brands = brands;
    })

  }

  initializeForm(){
    this.formGroup = this.formBuilder.group({
      brandName : [
        '', Validators.required
      ],
      brandId : [
        '', Validators.required
      ]
    })
  }

  getBrand(brandId :number)
  {
    this.brandService.getBrand(brandId).subscribe(res => {
      this.currentBrand = res.data;
      this.formGroup.patchValue(res.data)

    },
    error => {
      let err : ErrorResponseModel = error;
      this.toastrService.error(err.error.message,err.error.title);
      this.router.navigateByUrl("/");
    });
  }

  onSubmit()
  {
    if(this.formGroup.valid)
    {
      let form = this.formGroup.value;

      this.brandService.editBrand(form).subscribe(res => {
        this.toastrService.success(res.message,res.title)

        this.brands[this.brands.findIndex(x => x.brandId==res.data.brandId)] = form;
        this.dataSharingService.setBrands(this.brands);

      })
    }

  }


}
