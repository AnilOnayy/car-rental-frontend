import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Enviroment } from '../../environments/enviroment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})

export class BrandService{


  private apiUrl = Enviroment.apiUrl;


  constructor(private httpClient :HttpClient) {

  }

  getBrands(): Observable<ListResponseModel<Brand>>
  {
    let requestUrl = this.apiUrl  + "Brands/GetAll";
    return this.httpClient.get<ListResponseModel<Brand>>(requestUrl);
  }
  getBrand(brandId:number): Observable<SingleResponseModel <Brand> >
  {
    let requestUrl = this.apiUrl  + "Brands/GetById?id="+brandId;

    return this.httpClient.get<SingleResponseModel<Brand>>(requestUrl);
  }

  addBrand(brandName:string) : Observable<SingleResponseModel<Brand>>
  {
    let requestUrl = this.apiUrl  + "Brands/Add";
    return this.httpClient.post<SingleResponseModel<Brand>>(requestUrl,brandName);
  }

  removeBrand(brand:Brand) : Observable<SingleResponseModel<Brand>>
  {
    let requestUrl = this.apiUrl  + `Brands/Delete?id=${brand.brandId}`;
    return this.httpClient.delete<SingleResponseModel<Brand>>(requestUrl);
  }

  editBrand(brand:Brand): Observable<SingleResponseModel<Brand>>
  {
    let requestUrl = this.apiUrl  + `Brands/Update`;
    return this.httpClient.put<SingleResponseModel<Brand>>(requestUrl,brand);
  }


}
