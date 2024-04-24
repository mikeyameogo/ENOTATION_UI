import { Injectable } from '@angular/core';
import { IMinistere } from '../model/ministere';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { createRequestOption } from '../util/request-util';


type EntityResponseType = HttpResponse<IMinistere>;
type EntityArrayResponseType = HttpResponse<IMinistere[]>;
const ministereUrl = environment.ministereInstitutionResource;

@Injectable({
  providedIn: 'root'
})

export class MinistereService {



    constructor(private http:HttpClient) { }
    create(categorie: IMinistere): Observable<EntityResponseType> {
      return this.http.post<IMinistere>(ministereUrl, categorie, { observe: 'response' });
    }

    update(categorie: IMinistere): Observable<EntityResponseType> {
      return this.http.put<IMinistere>(ministereUrl, categorie, { observe: 'response' });
    }
    find(id: number): Observable<EntityResponseType> {
      return this.http.get<IMinistere>(`${ministereUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
      const options = createRequestOption(req);
       return this.http.get<IMinistere[]>(ministereUrl, { params: options, observe: 'response' });
    }

    findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
      return this.http.get<IMinistere[]>(ministereUrl, { observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<{}>> {
      return this.http.delete(`${ministereUrl}/${id}`, { observe: 'response' });
    }

}
