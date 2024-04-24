import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fonctionnaire, IFonctionnaire } from '../model/fonctionnaire';
import { createRequestOption } from '../util/request-util';
import { GetAllFonctionnaireResponse } from '../model/get-all-fonctionnaire-response';

type EntityResponseType = HttpResponse<IFonctionnaire>;
type EntityArrayResponseType = HttpResponse<IFonctionnaire[]>;
type GetAllEntityArrayResponseType = HttpResponse<GetAllFonctionnaireResponse[]>;
const fonctionnaireUrl = environment.fonctionnaireResource;
const afficherCodeUrl = environment.afficherCodeResource;
const genererCodeUrl =  environment.genererCodeResource;
const affiliationUrl = environment.changeAffiliationResource;
const verifierUrl = environment.verifierAffiliationResource;
const rejeterFonctionnaireUrl = environment.rejeterFonctionnaireResource;

const resourceUrlAgent=environment.mesAgentsResource;
// const rejeterFonctionnaireUrl = environment.rejeterFonctionnaireResource;

@Injectable({
  providedIn: 'root'
})
export class FonctionnaireService {

  constructor(private http:HttpClient) { }
  create(fonctionnaire: IFonctionnaire): Observable<EntityResponseType> {
    return this.http.post<IFonctionnaire>(fonctionnaireUrl, fonctionnaire, { observe: 'response' });
  }

  update(fonctionnaire: IFonctionnaire): Observable<EntityResponseType> {
    return this.http.put<IFonctionnaire>(fonctionnaireUrl, fonctionnaire, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFonctionnaire>(`${fonctionnaireUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<IFonctionnaire[]>(fonctionnaireUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IFonctionnaire[]>(fonctionnaireUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${fonctionnaireUrl}/${id}`, { observe: 'response' });
  }

  afficherCodeAffiliation(): Observable<IFonctionnaire> {
    return this.http.get(`${afficherCodeUrl}`, {});
  }

  genererCodeAffiliation(): Observable<IFonctionnaire> {
    return this.http.post(`${genererCodeUrl}`, {});
  }

  changerAffiliation(oldCodeAffiliation: string, newCodeAffiliation: string,
    reference: string, motif: string): Observable<any> {
    return this.http.post(affiliationUrl,
    {oldCodeAffiliation, newCodeAffiliation, reference, motif});
  }
  
  VerifierAffiliation(code: string): Observable<any> {
    return this.http.get(`${verifierUrl}/${code}`);
  }

  getAll(event?: LazyLoadEvent): Observable<GetAllFonctionnaireResponse> {
    // const pagination = this.paginationService.extractPage(event);
    return this.http.get(fonctionnaireUrl,{observe:'response'})  
    .pipe(map(response => {
        let fonctionnaireResponse: GetAllFonctionnaireResponse = {
          fonctionnaires: response.body as Fonctionnaire[],
        };

        return fonctionnaireResponse;
      }));
  }

  getAllAgent(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<Fonctionnaire[]>(resourceUrlAgent,{ params: options, observe: 'response' });
  }


  // getAllAgent(): Observable<GetAllFonctionnaireResponse> {
  //   return this.http.get(resourceUrlAgent,{observe:'response'})  
  //   .pipe(map(response => {
  //       let fonctionnaireResponse: GetAllFonctionnaireResponse = {
  //         fonctionnaires: response.body as Fonctionnaire[],

  //       };

  //       return fonctionnaireResponse;
  //     }));
  // }

  rejeterFonctionnaire(request: Fonctionnaire,matricule:string): Observable<Fonctionnaire> {
    return this.http.put(rejeterFonctionnaireUrl+matricule, request);
  }

  getFonctionnaireConnecte(matricule: string): Observable<IFonctionnaire> {
    return this.http.get(`${fonctionnaireUrl}/${matricule}`);
  }
}
