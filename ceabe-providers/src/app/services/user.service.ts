import {User} from './../models/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, filter, from, map, Observable, take, tap} from 'rxjs';
import {environment} from "../../environments/environment";
import {animate} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private httpClient: HttpClient) {
  }

  public searchByRUC(ruc): Observable<any> {
    return this.httpClient.post<any>(environment.url + "/sunat/ruc", {ruc: ruc});
  }

  public getCategoryList(dato): Observable<any> {
    return this.httpClient.post<any>(environment.url + "/categoria/listar", dato);
  }

  public registerSupplier(dato): Observable<any> {
    return this.httpClient.post<any>(environment.service + "/api/supplier/register/", dato);
  }

  public searchRUC(): Observable<any> {
    return this.httpClient.get<any>('./assets/data/sunat.json');
  }

  public getProfileSupplier(ruc): Observable<any> {
    return this.httpClient.get<any>(environment.service + "/api/supplier/" + ruc,);
  }

  // public validateExistSupplier(ruc): Observable<any> {
  //   return this.httpClient.get<any>(environment.service + "api/supplier/" + ruc);
  // }

  public sendReport(data): Observable<any> {
    return this.httpClient.post<any>(environment.service + "/api/supplier/report", data);
  }
}
