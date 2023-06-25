import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponse } from 'src/app/models/color/colorResponse';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private apiUrl = "https://localhost:7286/api/colors/getall";

  constructor(private httpClient:HttpClient) {

   }

   getColors() : Observable<ColorResponse>{
      return this.httpClient.get<ColorResponse>(this.apiUrl);
   }
}
