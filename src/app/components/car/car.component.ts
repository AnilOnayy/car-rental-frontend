import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{

  isLoaded = false;

  cars : Car[] = [];
  colors :Color[];
  brands :Brand[];


  carFilterText :string = "";
  colorFilterText :string = "";
  brandFilterText :string = "";



  brandId:number = 0;
  colorId:number = 0;
constructor(
  private carService :CarService,
  private activatedRoute:ActivatedRoute,
  private colorService:ColorService,
  private brandService:BrandService,
  private toastrService:ToastrService
  ) {

}

ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]!=null)
      {
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]!=null)
      {
        this.getCarsByColor(params["colorId"]);

      }
      else{
        this.getCars();
      }

      this.listBrands();
      this.listColors();
    })
}


getCars()
{
  this.carService.getCars().subscribe(res => {
    this.cars = res.data;
    this.isLoaded = true;
  })
}

getCarsByColor(colorId:number)
{
  this.carService.getCarsByColor(colorId).subscribe(res => {
    this.cars = res.data;
    this.isLoaded = true;
  });
}

getCarsByBrand(brandId:number)
{
  this.carService.getCarsByBrand(brandId).subscribe(res => {
    this.cars = res.data;
    this.isLoaded = true;
  });
}

listColors()
{
  this.colorService.getColors().subscribe(res => {
    this.colors = res.data;
  })
}

listBrands()
{
  this.brandService.getBrands().subscribe(res => {
    this.brands = res.data;
  })
}

onSubmit(){



    this.carService.getCarsByFilter(this.brandId,this.colorId).subscribe(
      res => {
      this.cars = res.data;
      this.toastrService.success("Cars Listed");
    }
    ,
    error => {
      let msg = error["error"]["errors"].join(",");
      this.toastrService.error(msg);
    }
    )
}
}



