import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let text = localStorage.getItem("login")?.toString();

    let newRequest : HttpRequest<any>;

    if(text !=null && text !="")
    {
      var result = JSON.parse(text);

      newRequest = request.clone({headers:request.headers.set("Authorization", "Bearer" + result.token)});

    }
    else{
      newRequest = request.clone();
    }



    return next.handle(newRequest);
  }
}
