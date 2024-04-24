import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AllStats, Stats } from '../models/stats';

const resourceUrl = environment.statRessource;

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private http: HttpClient) { }

  getAllRecours(annee: string): Observable<Stats> {
    return this.http.get(resourceUrl + 'note-recours/' + annee);
  }

  getAllOffices(annee: string): Observable<Stats> {
    return this.http.get(resourceUrl + 'note-offices/' + annee);
  }

  getAllParFonctionnaire(annee: string): Observable<AllStats> {
    return this.http.get(resourceUrl + 'fonctionnaire-ayant-note/' + annee, { observe: 'response' })
    .pipe(map(response => {
      let statResponse: AllStats = {
        stats: response.body as Stats[]
      };
      return statResponse;
    }));
  }

  getAllNoteMinistere(annee: string): Observable<AllStats> {
    return this.http.get(resourceUrl + 'note-ministere/' + annee, { observe: 'response' })
      .pipe(map(response => {
        let statResponse: AllStats = {
          stats: response.body as Stats[]
        };
        return statResponse;
      }));
  }

  getAllActiviteIdentique(annee: string): Observable<AllStats> {
    return this.http.get(resourceUrl + 'activite-identique/' + annee, { observe: 'response' })
      .pipe(map(response => {
        let statResponse: AllStats = {
          stats: response.body as Stats[]
        };
        return statResponse;
      }));
  }

  getAllCompteActif(): Observable<AllStats> {
    return this.http.get(resourceUrl + 'fonctionnaire-actif', { observe: 'response' })
      .pipe(map(response => {
        let statResponse: AllStats = {
          stats: response.body as Stats[]
        };
        return statResponse;
      }));
  }
}
