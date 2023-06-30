import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit{


  dataLoaded :boolean = false;
  photosLoaded :boolean=false;
  constructor(private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router
    ) {

  }

  carDetails : Car;
  photos : CarImage[];

  rentDate : string = "";
  returnDate : string  = "";

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

  rentCar()
  {
    if(this.rentDate =="")
    {
      this.toastrService.error("Please select a start date!");
    }
    else if(this.returnDate == "")
    {
      this.toastrService.error("Please select a return date!");
    }
    else{
      this.carDetailService.rentCar(this.rentDate,this.returnDate,this.carDetails.id).subscribe(
        res => {
          this.router.navigateByUrl(`/payment/${res.data.id}`);
      },
      error => {
        let errorModel :ErrorResponseModel = error;
        this.toastrService.error(errorModel.error.errors.join(","))
      }

      )

    }

  }
}
