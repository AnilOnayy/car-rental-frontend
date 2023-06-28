import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'colorPipe'
})
export class ColorPipePipe implements PipeTransform {

  transform(value: Car[],colorName:string): Car[] {
    colorName.toLowerCase();

    return  value.filter( (color) => {
        return color.colorName.toLowerCase().includes(colorName);
    });
  }

}
