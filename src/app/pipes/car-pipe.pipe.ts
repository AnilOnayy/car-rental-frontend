import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carPipe'
})
export class CarPipePipe implements PipeTransform {

  transform(value: Car[],carNameFilter:string): Car[] {
    carNameFilter.toLowerCase();
    return  value.filter( (car) => {
        return car.carName.toLowerCase().includes(carNameFilter);
    });

  }

}
