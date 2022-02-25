import {Component, OnInit} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {LoginService} from "./services/login.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }

  isLogged: boolean;

  constructor(private oauthService: OAuthService,
              private loginService: LoginService,) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: environment.keycloak,
    redirectUri: window.location.origin + '/cotizaciones/',
    clientId: 'ceabe-client-auth',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    sessionChecksEnabled: true,
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.setStorage(sessionStorage);
    this.isLogged = this.loginService.getIsLogged();
    console.log(this.isLogged)

    this.oauthService.loadDiscoveryDocument().then(
      () => this.oauthService.loadDiscoveryDocumentAndTryLogin()
    ).then(() => {
      if (this.oauthService.getIdentityClaims()) {
        console.log(this.oauthService.getIdentityClaims())
        console.log(this.oauthService.loadUserProfile())
        this.isLogged = this.loginService.getIsLogged();
        console.log(this.isLogged)
      }
    });

    if (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {

    } else {

    }

  }
}

