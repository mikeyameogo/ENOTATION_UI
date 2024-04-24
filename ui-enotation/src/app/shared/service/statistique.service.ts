import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStatistiqueDTO } from '../model/statistique-dto';
import { environment } from 'src/environments/environment';
import { createRequestOption } from '../util/request-util';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IStatistiqueDTO>;
type EntityArrayResponseType = HttpResponse<IStatistiqueDTO[]>;

const statistiqueUrl = environment.statRessource;

@Injectable({
    providedIn: 'root'
})
export class StatistiqueDTOService {

    constructor(private http: HttpClient) { }

    getAllRecours(annee: string): Observable<EntityResponseType> {
        return this.http.get(statistiqueUrl + 'note-recours/' + annee, { observe: 'response' });
    }

    getAllOffices(annee: string): Observable<EntityResponseType> {
        return this.http.get(statistiqueUrl + 'note-offices/' + annee, { observe: 'response' });
    }

    getAllParFonctionnaire(annee: string): Observable<EntityArrayResponseType> {
        return this.http.get<IStatistiqueDTO[]>(statistiqueUrl + 'fonctionnaire-ayant-note/' + annee, { observe: 'response' });
    }

    getAllNoteMinistere(annee: string): Observable<EntityArrayResponseType> {
        return this.http.get<IStatistiqueDTO[]>(statistiqueUrl + 'note-ministere/' + annee, { observe: 'response' });

    }

    getAllActiviteIdentique(annee: string): Observable<EntityArrayResponseType> {
        return this.http.get<IStatistiqueDTO[]>(statistiqueUrl + 'activite-identique/' + annee, { observe: 'response' });

    }

    getAllCompteActif(): Observable<EntityArrayResponseType> {
        return this.http.get<IStatistiqueDTO[]>(statistiqueUrl + 'fonctionnaire-actif', { observe: 'response' });
    }

}
