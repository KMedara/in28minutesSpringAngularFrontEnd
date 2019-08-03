import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

//HttpInterceptor is used to add headers to each request instead of doing it manually in each method
//Here we intercept the request, clone it and modify it, and then sending the modified request to the HttpHandler
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(
    private bas: BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let username = 'user';
    // let password = 'password';
    // let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password); //btoa is 64 bit encoding for the username and password
    let basicAuthHeaderString = this.bas.getAuthenticatedToken();
    let username = this.bas.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }

    return next.handle(request) //send modified request
  }
}
