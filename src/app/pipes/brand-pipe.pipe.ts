import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'brandPipe'
})
export class BrandPipePipe implements PipeTransform {

  transform(value: Car[],brandName:string): Car[] {
    brandName.toLowerCase();

    return  value.filter( (car) => {
        return car.brand.name.toLowerCase().includes(brandName);
    });
  }

}
