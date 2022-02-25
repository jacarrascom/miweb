import {Component, OnInit, Input} from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() isLogged: boolean;


  constructor(public loginService: LoginService) {

  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
  }

  login() {
    this.loginService.login();
  }
}
