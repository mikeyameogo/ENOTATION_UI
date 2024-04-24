import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';
import { map } from 'rxjs/operators';
import { PaginationService, totalCountHeader } from './pagination.service';
import { GetAllPeriodeResponse } from '../models/get-all-periode-response';
import { Periode } from '../models/periode';

const resourceUrl = environment.periodeResources;

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {
  constructor(private http: HttpClient,private paginationService: PaginationService) { }

 

  getAll(event?: LazyLoadEvent,id?:number):Observable<GetAllPeriodeResponse>{
    return this.http.get(`${resourceUrl}/${id}`, {observe:'response'})
    .pipe(map(response=> {
            let periodeResponse: GetAllPeriodeResponse = {
              //  totalCount: parseInt(response.headers.get(totalCountHeader)),
              periodes: response.body as Periode[]
            };
            return periodeResponse;
          }));
  }

  create(request: Periode): Observable<Periode> {
    return this.http.post(resourceUrl, request);
  }

  update(request: Periode): Observable<Periode> {
    return this.http.put(resourceUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}

