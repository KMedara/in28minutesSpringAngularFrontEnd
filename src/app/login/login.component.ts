import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = 'Invalid Credentials';
  username = 'in28minutes';
  password = '';
  invalidLogin = false;

  //dependency injection to add a router member variable to component, available to use 
  //dependency injection to make use of service to handle authentication logic
  constructor(
    private router: Router,
    private bas: BasicAuthenticationService) { }

  ngOnInit() {
  }

  handleBasicAuthLogin() {
    this.bas.executeAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['welcome', this.username])
        this.invalidLogin = false
      },
      error => {
        console.log(error)
        this.invalidLogin = true;
      }
    )

  }

  handleJWTAuthLogin() {
    this.bas.executeJWTAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['welcome', this.username])
        this.invalidLogin = false
      },
      error => {
        console.log(error)
        this.invalidLogin = true;
      }
    )

  }
}
