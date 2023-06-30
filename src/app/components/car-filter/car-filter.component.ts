import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';



@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit{

  colors :Color[];
  brands :Brand[];

  brandId:number = 0;
  colorId:number = 0;

  constructor(
    private colorService:ColorService,
    private brandService:BrandService
  ) {}

  carFilterText :string = "";
  colorFilterText :string = "";
  brandFilterText :string = "";

  ngOnInit(): void {
    this.listBrands();
    this.listColors();
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
    if(this.brandId==0)
    {

    }
    else{

    }
  }

}
