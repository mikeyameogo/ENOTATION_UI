import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetAllMinistereInstitutionResponse } from '../models/get-all-ministere-institution-response';
import { MinistereInstitution } from '../models/ministere-institution';

const resourceUrl = environment.ministereInstitutionResource;

@Injectable({
  providedIn: 'root'
})
export class MinistereInstitutionService {
  constructor(private http: HttpClient) { }

  // getAll(event?: LazyLoadEvent): Observable<GetAllMinistereInstitutionAgentResponse> {
  //   const pagination = this.paginationService.extractPage(event);
  //   return this.http.get(resourceUrl, { params: { page: pagination.page, size: pagination.size }, observe: 'response' })  
  //   .pipe(map(response => {
  //       let agentResponse: GetAllMinistereInstitutionAgentResponse = {
  //         totalCount: parseInt(response.headers.get(totalCountHeader)),
  //         MinistereInstitutionAgents: response.body as MinistereInstitutionAgent[]
  //       };
  //       return agentResponse;
  //     }));
  // }

  getAll(event?: LazyLoadEvent):Observable<GetAllMinistereInstitutionResponse>{
    return this.http.get(resourceUrl+'/list', {observe:'response'})
    .pipe(map(response=> {
            let ministereInstitutionResponse: GetAllMinistereInstitutionResponse = {
              ministereInstitutions: response.body as MinistereInstitution[]
            };
            return ministereInstitutionResponse;
          }));
  }

  create(request: MinistereInstitution): Observable<MinistereInstitution> {
    return this.http.post(resourceUrl, request);
  }

  update(request: MinistereInstitution): Observable<MinistereInstitution> {
    return this.http.put(resourceUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}