/*
  All classes that are present in a single file and all the other functions
  which happen in here are part of a module.
  If you want to use classes from other modules, you must import.
  To use these classes outside of this module you must export
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';
//import { AppComponent } from '../app.component';

//Decorator in TS is an annotation in Java
//Decorators create and set attributes of an object
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

/*export says I want to use this class outside this particular module*/
export class WelcomeComponent implements OnInit {

  //member variables
  message = 'Some welcome message';
  welcomeMessageFromService = '';
  errorMessageFromService = '';
  name = '';

  //ActivatedRoute dependency injection to pick up paramater passed in from route (check routing module)
  constructor(private route: ActivatedRoute, private wds:WelcomeDataService) { }

  ngOnInit() {
    
    //console.log(this.message);
    //console.log(this.route.snapshot.params['name']);
    this.name = this.route.snapshot.params['name']; //sets name member variable to router parameter name
  }

  getWelcomeMessage(){
   // console.log(this.wds.executeHelloWorldBeanService());
    this.wds.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithParameter(){
   // console.log(this.wds.executeHelloWorldBeanService());
    this.wds.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response){
    this.welcomeMessageFromService = response.message;
    //console.log(response.message);
  }

  handleErrorResponse(error){
    this.errorMessageFromService = error.error.message;
  }
}
