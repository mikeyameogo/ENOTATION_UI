import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { map } from 'rxjs/operators';
import { PaginationService, totalCountHeader } from './pagination.service';
import { GetAllProfilResponse } from '../models/get-all-profil-response';
import { Profil } from '../models/profil';

const resourceUrl = environment.profilResource;

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  constructor(private http: HttpClient,private paginationService: PaginationService) { }

  // getAll(event?: LazyLoadEvent): Observable<GetAllProfilAgentResponse> {
  //   const pagination = this.paginationService.extractPage(event);
  //   return this.http.get(resourceUrl, { params: { page: pagination.page, size: pagination.size }, observe: 'response' })  
  //   .pipe(map(response => {
  //       let agentResponse: GetAllProfilAgentResponse = {
  //         totalCount: parseInt(response.headers.get(totalCountHeader)),
  //         profilAgents: response.body as ProfilAgent[]
  //       };
  //       return agentResponse;
  //     }));
  // }

  getAll(event?: LazyLoadEvent):Observable<GetAllProfilResponse>{
    return this.http.get(resourceUrl+'/list', {observe:'response'})
    .pipe(map(response=> {
            let profilResponse: GetAllProfilResponse = {
              //  totalCount: parseInt(response.headers.get(totalCountHeader)),
              profils: response.body as Profil[]
            };
            return profilResponse;
          }));
  }

  create(request: Profil): Observable<Profil> {
    return this.http.post(resourceUrl, request);
  }

  update(request: Profil): Observable<Profil> {
    return this.http.put(resourceUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}

