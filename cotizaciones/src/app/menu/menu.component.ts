import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() isLogged: boolean= false;
   razonSocial: string= '';
  username: string= '';


  constructor(public loginService: LoginService) {
    this.razonSocial  = this.loginService.getName();
    this.username = this.loginService.getUsername();
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
  }

  login() {
    this.loginService.login();
  }

  register(): void {
    window.location.href = 'http://localhost:5000/register';
  }

  profile() {
    window.location.href = 'http://localhost:5000/profile';
  }

}
