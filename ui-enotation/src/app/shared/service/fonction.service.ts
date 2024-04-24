import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { IFonction } from '../model/fonction';
import { createRequestOption } from '../util/request-util';
import { environment } from 'src/environments/environment';

type EntityResponseType = HttpResponse<IFonction>;
type EntityArrayResponseType = HttpResponse<IFonction[]>;
const fonctionUrl = environment.profilResource;

@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  constructor(private http:HttpClient) { }
  create(fonction: IFonction): Observable<EntityResponseType> {
    return this.http.post<IFonction>(fonctionUrl, fonction, { observe: 'response' });
  }

  update(fonction: IFonction): Observable<EntityResponseType> {
    return this.http.put<IFonction>(fonctionUrl, fonction, { observe: 'response' });
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFonction>(`${fonctionUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
     return this.http.get<IFonction[]>(fonctionUrl, { params: options, observe: 'response' });
  }

  findAll(event?: LazyLoadEvent): Observable<EntityArrayResponseType> {
    return this.http.get<IFonction[]>(fonctionUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${fonctionUrl}/${id}`, { observe: 'response' });
  }
}
