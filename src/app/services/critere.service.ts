import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Critere } from '../models/critere';
import { GetAllCritere } from '../models/get-all-critere';

const resourceUrl=environment.critereResource;
@Injectable({
  providedIn: 'root'
})
export class CritereService {
  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllCritere> {
    // const pagination = this.paginationService.extractPage(event);
    return this.http.get(resourceUrl,{observe:'response'})  
    .pipe(map(response => {
        let fonctionnaireResponse: GetAllCritere = {
          criteres: response.body as Critere[],

        };

        return fonctionnaireResponse;
      }));
  }

  // getAll(event?: LazyLoadEvent):Observable<GetAllProfilResponse>{
  //   return this.http.get(resourceUrl, {observe:'response'})
  //   .pipe(map(response=> {
  //           let profilResponse: GetAllProfilResponse = {
  //             //  totalCount: parseInt(response.headers.get(totalCountHeader)),
  //             profils: response.body as Profil[]
  //           };
  //           return profilResponse;
  //         }));
  // }

  create(request: Critere): Observable<Critere> {
    return this.http.post(resourceUrl, request);
  }

  update(request: Critere): Observable<Critere> {
    return this.http.put(resourceUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}
