import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{

  isLoaded = false;
  cars : Car[] = [];
  carFilterText :string = "";
  colorFilterText :string = "";
  brandFilterText :string = "";

constructor(private carService :CarService,private activatedRoute:ActivatedRoute) {

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
}
