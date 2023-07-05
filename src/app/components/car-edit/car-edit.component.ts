import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { ErrorResponseModel } from 'src/app/models/errorResponseModel';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Enviroment } from 'src/environments/enviroment';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent  implements OnInit {

  formGroup : FormGroup;

  currentCar : Car;

  carImages : CarImage[];
  carImagesLoaded :boolean = false;
  imageFiles :FileList;
  defaultPhoto : string = Enviroment.logo;


  brands : Brand[];
  colors : Color[];

  constructor(
    private carService : CarService,
    private carImageService : CarImageService,
    private dataSharingService : DataSharingService,
    private activatedRoute :ActivatedRoute,
    private router :Router,
    private formBuilder : FormBuilder,
    private toastrService: ToastrService,
    private elementRef :ElementRef
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      let carId : number = params["carId"];

      if( !isNaN(carId))
      {
        this.initForm();
        this.getCar(carId);
        this.getBrands();
        this.getColors();
        this.getCarImages(carId);
      }
      else{
        this.router.navigateByUrl("/");
      }
    })
  }


  getCar(carId :number)
  {
    this.carService.getCar(carId).subscribe(res => {

      if(res.data != null)
      this.currentCar = res.data;
      this.formGroup.patchValue(res.data);

      this.formGroup.patchValue(
        {
          colorId : res.data.color.colorId,
          brandId : res.data.brand.brandId
        })
    },
    error => {
      let err :ErrorResponseModel = error;

      this.toastrService.error(err.error.message,err.error.title);
      this.router.navigateByUrl("/");
    }
    )
  }

  getCarImages(carId:number)
  {
    this.carImageService.getImagesByCar(carId).subscribe(res => {
      this.carImages = res.data;
      this.carImagesLoaded=true;
    });
  }

  getColors(){
    this.dataSharingService.colors$.subscribe(colors => {
      this.colors = colors;
    })
  }

  getBrands()
  {
    this.dataSharingService.brands$.subscribe(brands => {
      this.brands = brands;
    })
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      id :['',Validators.required],
      description : [ '',Validators.required ],
      brandId : [ '',Validators.required ],
      colorId : [ '',Validators.required ],
      modelYear : [ '',Validators.required ],
      dailyPrice : [ '',Validators.required ]

    })
  }


  uploadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.imageFiles = files;
  }

  removeCar()
  {
    this.carService.delete(this.currentCar.id).subscribe(res => {
      this.router.navigateByUrl("/");
    },
    error => {
      let err : ErrorResponseModel = error;

      this.toastrService.error(err.error.message,err.error.title);
    }
    )
  }


  onSubmit()
  {
    if(this.formGroup.valid)
    {
      let formData = Object.assign({},this.formGroup.value);

        this.carService.update(formData).subscribe(res => {

          if(this.imageFiles != null)
          {
            this.uploadCarImages(res.data.id).subscribe(
              res => {
                this.carImages.push(...res.data);
                const fileInput = this.elementRef.nativeElement.querySelector("#fileInput");
                console.log(fileInput);
                fileInput.value = null;
              },
              error => {
                let err : ErrorResponseModel = error;
                this.toastrService.error(err.error.message,err.error.title);
              }
            );
          }


          this.toastrService.success(res.message,res.title);
        },
        error => {
          let err :ErrorResponseModel = error;
          this.toastrService.error(err.error.message,err.error.title);

        }
        )
    }
    else{
      this.toastrService.error("Please fill the form.");
    }
  }


  uploadCarImages(carId :number) : Observable<any>
  {

      const formData = new FormData();

      // Add Photos


        for(let i = 0;  i < this.imageFiles.length ; i++)
        {
          formData.append("ImageFiles",this.imageFiles[i]);
        }
        formData.append("carId",carId.toString());

        return this.carImageService.add(formData);

  }

removeCarImage(carImage : CarImage)
{
  this.carImageService.removeCarImage(carImage).subscribe(res => {
    this.carImages.splice( this.carImages.findIndex(x => x.id==carImage.id) ,1);
  })
}

}
