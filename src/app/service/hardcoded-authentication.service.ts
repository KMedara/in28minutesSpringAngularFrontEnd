import { Injectable } from '@angular/core';

//@Injectable is what makes it a service
//can use this to inject service where needed
@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }
  authenticate(username, password){
    //console.log(this.isUserLoggedIn());
    if(username === "in28minutes" && password === 'dummy') {
      sessionStorage.setItem('authenticatedUser', username);
      //console.log("after" + this.isUserLoggedIn());

      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem('authenticatedUser');
  }
}
