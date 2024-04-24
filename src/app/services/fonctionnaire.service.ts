import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ChangePasswordVo, Fonctionnaire } from '../models/fonctionnaire';
import { GetAllFonctionnaireResponse } from '../models/get-all-fonctionnaire-response';
import { PaginationService } from './pagination.service';
const resourceUrl=environment.fonctionnaireResource;
const affiliationUrl=environment.changeAffiliationResource;
const verifierUrl=environment.verifierAffiliationResource;
const resourceUrlAgent=environment.mesAgentsResource;
const genererCodeUrl=environment.genererCodeResource;
const afficherCodeUrl=environment.afficherCodeResource;
const changePasswordUrl = environment.changePassword;
const rejeterFonctionnaireUrl = environment.rejeterFonctionnaireResource;

@Injectable({
  providedIn: 'root'
})
export class FonctionnaireService {

  constructor(private http: HttpClient,private paginationService: PaginationService) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllFonctionnaireResponse> {
    // const pagination = this.paginationService.extractPage(event);
    return this.http.get(resourceUrl,{observe:'response'})  
    .pipe(map(response => {
        let fonctionnaireResponse: GetAllFonctionnaireResponse = {
          fonctionnaires: response.body as Fonctionnaire[],
        };

        return fonctionnaireResponse;
      }));
  }


  getAllAgent(): Observable<GetAllFonctionnaireResponse> {
    return this.http.get(resourceUrlAgent,{observe:'response'})  
    .pipe(map(response => {
        let fonctionnaireResponse: GetAllFonctionnaireResponse = {
          fonctionnaires: response.body as Fonctionnaire[],

        };

        return fonctionnaireResponse;
      }));
  }


  create(request: Fonctionnaire): Observable<Fonctionnaire> {
    return this.http.post(resourceUrl, request);
  }

  update(request: Fonctionnaire): Observable<Fonctionnaire> {
    return this.http.put(resourceUrl, request);
  }

  rejeterFonctionnaire(request: Fonctionnaire,matricule:string): Observable<Fonctionnaire> {
    return this.http.put(rejeterFonctionnaireUrl+matricule, request);
  }

  delete(id: number): Observable<void> {
    const typeAgent = "profil";
    return this.http.delete<void>(`${resourceUrl}/${typeAgent}/${id}`);
  }

  changerAffiliation(oldCodeAffiliation: string, newCodeAffiliation: string,
    reference: string, motif: string): Observable<any> {
    return this.http.post(affiliationUrl,
    {oldCodeAffiliation, newCodeAffiliation, reference, motif});
  }
  
  VerifierAffiliation(code: string): Observable<any> {
    return this.http.get(`${verifierUrl}/${code}`);
  }

  genererCodeAffiliation(): Observable<Fonctionnaire> {
    return this.http.post(`${genererCodeUrl}`, {});
  }

  afficherCodeAffiliation(): Observable<Fonctionnaire> {
    return this.http.get(`${afficherCodeUrl}`, {});
  }

  changerPassword(request: ChangePasswordVo): Observable<ChangePasswordVo> {
    return this.http.post(changePasswordUrl,request);
  }

  getFonctionnaireConnecte(matricule: string): Observable<Fonctionnaire> {
    return this.http.get(`${resourceUrl}/${matricule}`);
  }

}
