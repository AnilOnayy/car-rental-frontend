import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit{

  isLoaded = false;
  brands : Brand[] = [];
  currentBrandId : number;

  constructor(private brandService:BrandService) {

  }

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(response => {
      this.brands =response.data;
      this.isLoaded= true;
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
}
