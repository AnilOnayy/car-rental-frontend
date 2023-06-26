import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit{


  dataLoaded :boolean = false;
  photosLoaded :boolean=false;
  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute) {

  }

  carDetails : Car;
  photos : CarImage[];

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        this.getCar(params["carId"]);
        this.getCarPhotos(params["carId"]);
      })
  }


  getCar(carId:number){
    this.carDetailService.getCar(carId).subscribe(res => {
      this.carDetails = res.data;
      this.dataLoaded=true;
    });
  }

  getCarPhotos(carId:number)
  {
    this.carDetailService.getCarImages(carId).subscribe(res => {
      this.photos = res.data;
      this.photosLoaded=true;
    });
  }
}
