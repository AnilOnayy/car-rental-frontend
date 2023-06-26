import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})

export class ColorComponent implements OnInit {


  isLoaded = false;
  colors : Color[] = [];
  currentColorId:number;

constructor(private colorService : ColorService) {

}

ngOnInit(): void {
  this.getColors();
}

getColors()
{
  this.colorService.getColors().subscribe(res => {
    this.colors = res.data;
    this.isLoaded = true;
  })
}

isCurrentColor(colorId:number)
{
  return this.currentColorId==colorId;
}

setCurrentColor(colorId:number)
{
  this.currentColorId = colorId;
}


}
