import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFonctionnaire } from '../model/fonctionnaire';
import { ILoginVM } from '../model/login-vm';

const resourceUrl = environment.authResource;
const resetInitUrl = environment.resetInitResource;
const resetFinishUrl = environment.resetFinishResource;
const activateAccountUrl = environment.activateAccountResource;
const activerCompteMinistreUrl = environment.activerCompteMinistre;

type EntityResponseType = HttpResponse<ILoginVM>;
type FonctionnaireResponseType = HttpResponse<IFonctionnaire>;
type EntityArrayResponseType = HttpResponse<ILoginVM[]>;

@Injectable({
  providedIn: 'root' 
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(request: ILoginVM): Observable<any> {
    return this.http.post(resourceUrl,request,{ observe: 'response' });
  }

  resetInit(email: String): Observable<any> {
      return this.http.post(resetInitUrl, {email},{observe: 'response'});
    }

  resetFinish(password: String, token:any): Observable<any> {
    return this.http.post(resetFinishUrl, {password, token});
  }

  activateAccount (request:IFonctionnaire):Observable<FonctionnaireResponseType>{
    return this.http.post<IFonctionnaire>(activateAccountUrl,request, {observe:'response'})
  }

  activerCompteMinistre (request:IFonctionnaire):Observable<FonctionnaireResponseType>{
    return this.http.post<IFonctionnaire>(activerCompteMinistreUrl,request, {observe:'response'})
  }

}
