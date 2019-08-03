import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL, AUTHENTICATED_USER, TOKEN } from '../app.constants';


//@Injectable is what makes it a service
//can use this to inject service where needed
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username, password) {

    return this.http.post<any>(
      `${API_URL}/authenticate`, {
        username,
        password 
      }).pipe( //pipe defines an action to do after service succeeds
        map( //if proper response, we'll map the data into session storage and set authenticated user
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);

            return data; //returns response back to give data to whoever is subscribing
          }
        )
      );
  }
  //passing in username and password,
  //creating basic auth string
  //if successful we use pipe method
  //pipe method declares what to do if request succeeds or fails
  executeAuthenticationService(username, password) {

    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password); //btoa is 64 bit encoding for the username and password

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>(
      `${API_URL}/basicauth`,
      { headers }).pipe( //pipe defines an action to do after service succeeds
        map( //if proper response, we'll map the data into session storage and set authenticated user
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);

            return data; //returns response back to give data to whoever is subscribing
          }
        )
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);

    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean {
  constructor(public message: string) { }
}
