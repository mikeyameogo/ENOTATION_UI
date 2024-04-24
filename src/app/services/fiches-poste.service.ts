import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FichesPoste } from '../models/fiches-poste';
import { GetAllFichesPosteResponse } from '../models/get-all-fiches-poste-response';


const resourceUrl=environment.fichesPosteResource;
const fileResourceUrl=environment.fileResource;

@Injectable({
  providedIn: 'root'
})
export class FichesPosteService {

  constructor(private http: HttpClient) { }

  getFichesPostes(event?: LazyLoadEvent):Observable<GetAllFichesPosteResponse> {
    return this.http.get(resourceUrl, {observe:'response'})
    .pipe(map(response=> {
            let fichesPosteResponse: GetAllFichesPosteResponse = {
              //  totalCount: parseInt(response.headers.get(totalCountHeader)),
              fichesPostes: response.body as FichesPoste[]
            };
            return fichesPosteResponse;
          }));
}

create(request: any): Observable<FichesPoste> {
  return this.http.post(resourceUrl, request);
}

update(request: FichesPoste): Observable<FichesPoste> {
  return this.http.put(resourceUrl, request);
}

delete(id: number): Observable<void> {
  return this.http.delete<void>(`${resourceUrl}/${id}`);
}

//Definition de la methode du download de fichiers
downloadFile(url: string): Observable<Blob> {
  return this.http.get(url, {
    reportProgress: true,
    responseType: 'blob'
  });
}

}
