import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetAllActiviteResponse } from '../models/get-all-activite-response';
import { Activite } from '../models/activite';

const resourceUrl = environment.activiteResource;
const resourceUrl2 = environment.activiteResourceAgent;
const resourceProposeUrl = environment.propositionActResources;

const resourceModifierUrl = environment.modifierActResources;

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  constructor(private http: HttpClient) { }

  getAll(matricule:string, annee:number,event?: LazyLoadEvent):Observable<GetAllActiviteResponse>{
    return this.http.get(resourceUrl2+matricule+'/'+annee, {observe:'response'})
    .pipe(map(response=> {
            let activiteResponse: GetAllActiviteResponse = {
              activites: response.body as Activite[]
            };
            return activiteResponse;
          }));
  }

  create(request: Activite): Observable<Activite> {
    return this.http.post(resourceUrl, request);
  }

  createPropose(request: Activite, matricule:string): Observable<Activite> {
    return this.http.post(resourceProposeUrl+matricule, request);
  }

  update(request: Activite): Observable<Activite> {
    return this.http.put(resourceUrl, request);
  }

  updatePropose(request: Activite,matricule:string): Observable<Activite> {
    return this.http.put(resourceModifierUrl+matricule, request);
  }

  cloturer(request: Activite): Observable<Activite> {
    return this.http.put(resourceUrl+'/cloturer', request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}