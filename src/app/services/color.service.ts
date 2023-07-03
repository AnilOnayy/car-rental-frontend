import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Enviroment } from '../../environments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ColorService {




  private  apiUrl = Enviroment.apiUrl;

  constructor(private httpClient:HttpClient) {

   }



   getColors() : Observable<ListResponseModel<Color>>{
      let requestPath =  this.apiUrl + "Colors/GetAll";
      return this.httpClient.get<ListResponseModel<Color>>(requestPath);
   }
   getColor(colorId:number) : Observable<SingleResponseModel<Color>>{
    let requestPath =  this.apiUrl + "Colors/GetById?id="+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(requestPath);
 }
   addColor(colorObject : Color) : Observable<SingleResponseModel<Color> >
   {
    let requestPath =  this.apiUrl + "Colors/Add";
    return this.httpClient.post<SingleResponseModel<Color>>(requestPath,colorObject);
   }

   removeColor(colorObject: Color) : Observable<SingleResponseModel<Color>>
   {
    let requestPath =  this.apiUrl + "Colors/Delete?id="+colorObject.colorId;
    return this.httpClient.delete<SingleResponseModel<Color>>(requestPath);
   }

   updateColor(colorObject: Color) : Observable<SingleResponseModel<Color>>
   {
    let requestPath =  this.apiUrl + "Colors/Update?id="+colorObject.colorId;
    return this.httpClient.put<SingleResponseModel<Color>>(requestPath,colorObject);
   }

}
