import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fonctionnaire } from '../models/fonctionnaire';

const resourceUrl = environment.authResource; 
const resetInitUrl = environment.resetInitResource; 
const resetFinishUrl = environment.resetFinishResource; 
const activateAccountUrl = environment.activateAccountResource; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string, rememberMe:string): Observable<any> {
    return this.http.post(resourceUrl, {
      username,
      password,
      rememberMe
    });
  }

  resetInit(email: String): Observable<any> {
      return this.http.post(resetInitUrl, {email});
    }

  resetFinish(password: String, token:any): Observable<any> {
    return this.http.post(resetFinishUrl, {password, token});
  }
   
  activateAccount (request:Fonctionnaire):Observable<any>{
    return this.http.post(activateAccountUrl,request)
  }
}
