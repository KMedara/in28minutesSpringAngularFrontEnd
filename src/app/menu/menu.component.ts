import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedIn: boolean = false;
  constructor(public hcaService: HardcodedAuthenticationService) { }

  ngOnInit() {
    this.loggedIn = this.hcaService.isUserLoggedIn(); //when menu is initialized, check if user is logged
  }

}
