import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { Enviroment } from 'src/environments/enviroment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit{


  dataLoaded :boolean = false;
  photosLoaded :boolean=false;

  defaultPhoto :string = Enviroment.logo;

  constructor(
    private carService:CarService,
    private carImageService : CarImageService,
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

        if( !isNaN(params["carId"]) )
        {
          this.getCar(params["carId"]);
          this.getCarPhotos(params["carId"]);
        }
        else{
          this.router.navigateByUrl("/");
        }

      })
  }


  getCar(carId:number){
    this.carService.getCar(carId).subscribe(res => {
      this.carDetails = res.data;
      this.dataLoaded=true;
    },
    error => {
      let err :ErrorResponseModel = error;
      this.toastrService.error(err.error.message,err.error.title);
      this.router.navigateByUrl("/");
    }
    );
  }

  getCarPhotos(carId:number)
  {
    this.carImageService.getImagesByCar(carId).subscribe(res => {
      this.photos = res.data;
      this.photosLoaded=true;
    });
  }



  rentCar()
  {
    let s = Date.parse(this.rentDate);
    let e = Date.parse(this.returnDate);

    if(this.rentDate =="")
    {
      this.toastrService.error("Please select a start date!");
    }
    else if(this.returnDate == "")
    {
      this.toastrService.error("Please select a return date!");
    }
    else if( s > e)
    {
      this.toastrService.error("Return date must greater than rent date!");
    }
    else{
      this.carService.rentCar(this.rentDate,this.returnDate,this.carDetails.id).subscribe(
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
