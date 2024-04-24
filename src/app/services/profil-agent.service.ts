import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { map } from 'rxjs/operators';
import { PaginationService, totalCountHeader } from './pagination.service';
import { GetAllProfilAgentResponse } from '../models/get-all-profil-agent-response';
import { ProfilAgent } from '../models/profil-agent';

const resourceUrl = environment.profilAgentResource;

@Injectable({
  providedIn: 'root'
})

export class ProfilAgentService {
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

  getAll(event?: LazyLoadEvent):Observable<GetAllProfilAgentResponse>{
    return this.http.get(resourceUrl, {observe:'response'})
    .pipe(map(response=> {
            let profilAgentResponse: GetAllProfilAgentResponse = {
              //  totalCount: parseInt(response.headers.get(totalCountHeader)),
              profilAgents: response.body as ProfilAgent[]
            };
            return profilAgentResponse;
          }));
  }

  create(request: ProfilAgent): Observable<ProfilAgent> {
    return this.http.post(resourceUrl, request);
  }

  update(request: ProfilAgent): Observable<ProfilAgent> {
    return this.http.put(resourceUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}


