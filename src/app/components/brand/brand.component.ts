import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{

  isLoaded = false;
  brands : Brand[] = [];
  currentBrandId : number;

  isAuthenticated :Boolean;

  constructor(
    private dataSharingService:DataSharingService,
    private brandService :BrandService,
    private toastrService :ToastrService,
    private authService :AuthService
    ) {

  }

  ngOnInit(): void {
   this.getBrands();

   this.isAuthenticated = this.authService.isAuthenticated();
  }



  getBrands()
  {
    this.dataSharingService.brands$.subscribe(brands => {
      this.brands = brands
      this.isLoaded = true;
    })
  }


  isCurrentBrand(BrandId:number)
{
  return this.currentBrandId==BrandId;
}

setCurrentBrand(BrandId:number)
{
  this.currentBrandId = BrandId;
}


removeBrand(brand:Brand)
{
  this.brandService.removeBrand(brand).subscribe(
    res => {
     this.brands.splice( this.brands.indexOf(brand)  ,1);
     this.dataSharingService.setBrands(this.brands);
    },
    error => {
      let err : ErrorResponseModel = error;
      this.toastrService.error(err.error.message,err.error.title )
    }
  )
}
}
