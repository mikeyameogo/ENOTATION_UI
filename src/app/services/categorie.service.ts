import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Categorie } from '../models/categorie';
import { GetAllCategorie } from '../models/get-all-categorie';

const resourceUrl= environment.categorieResource;
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  constructor(private http: HttpClient) { }

  getAll(event?: LazyLoadEvent): Observable<GetAllCategorie> {
    // const pagination = this.paginationService.extractPage(event);
    return this.http.get(resourceUrl,{observe:'response'})  
    .pipe(map(response => {
        let categoriesResponse: GetAllCategorie = {
          categories: response.body as Categorie[],

        };

        return categoriesResponse;
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

  create(request: Categorie): Observable<Categorie> {
    return this.http.post(resourceUrl, request);
  }

  update(request: Categorie): Observable<Categorie> {
    return this.http.put(resourceUrl, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${resourceUrl}/${id}`);
  }
}
