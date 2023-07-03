import { Injectable } from '@angular/core';
import { ColorService } from './color.service';
import { BrandService } from './brand.service';
import { BehaviorSubject } from 'rxjs';
import { Brand } from '../models/brand';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor(
    private colorService : ColorService,
    private brandService : BrandService
  ) {
    colorService.getColors().subscribe(res=>{
        this.colorsSubject.next(res.data);
    });

    brandService.getBrands().subscribe(res=>{
      this.brandsSubject.next(res.data);
  });
  }

   // Verileri depolamak için BehaviorSubject kullanılır
   private colorsSubject = new BehaviorSubject<Color[]>([]);
   colors$ = this.colorsSubject.asObservable();

   private brandsSubject = new BehaviorSubject<Brand[]>([]);
   brands$ = this.brandsSubject.asObservable();


   // Colors verilerini günceller ve subscribers'a bildirir
  setColors(colors: Color[]) {
    this.colorsSubject.next(colors);
  }

  // Brands verilerini günceller ve subscribers'a bildirir
  setBrands(brands: Brand[]) {
    this.brandsSubject.next(brands);
  }

}
