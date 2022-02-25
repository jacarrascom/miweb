import {OAuthService} from 'angular-oauth2-oidc';
import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private oauthService: OAuthService) {
  }

  public login(): void {
    this.oauthService.initImplicitFlowInternal();
  }

  public logout(): void {
    this.oauthService.revokeTokenAndLogout().then(info => console.log(info));
  }

  public getToken(): string {
    return this.oauthService.getAccessToken();
  }

  public getIsLogged(): boolean {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getUsername(): string {
    return this.oauthService.getIdentityClaims() == null
      ? this.oauthService.getIdentityClaims() : this.oauthService.getIdentityClaims()[`preferred_username`];
  }

  public getName(): string {
    return this.oauthService.getIdentityClaims() == null
      // ? this.oauthService.getIdentityClaims() : this.oauthService.getIdentityClaims()[`family_name`]; // representante
      // ? this.oauthService.getIdentityClaims() : this.oauthService.getIdentityClaims()[`name`]; //fullname
      ? this.oauthService.getIdentityClaims() : this.oauthService.getIdentityClaims()[`given_name`]; // razon social
  }


  public getIsAdmin(): boolean {
    if (this.oauthService.getAccessToken() == null) return false;

    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  }
}

