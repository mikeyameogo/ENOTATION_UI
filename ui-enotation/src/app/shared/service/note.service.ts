import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseUrl, environment } from 'src/environments/environment';
import { GetAllNote } from '../model/get-all-note';
import { Note } from '../model/note';
import { createRequestOption } from '../util/request-util';
const resourceUrl= environment.mesNotesResource;
const noteUpdateUrl = environment.noteUpdateResource;
const noteOfficeResourceUrl= environment.noteOfficeResource;
const noteCouranteResourceUrl= environment.noteCouranteResource;
const noteSuperieurProposer=environment.noteSuperieurProposer;
const noteAgentProposer=environment.noteAgentProposer;
const printNoteUrl = environment.printNoteResource;
const noteActiviteUrl = environment.noteActiviteResource;
const acceptNoteUrl = environment.acceptNoteResource;
const rejectNoteUrl = environment.rejectNoteResource;

type EntityArrayResponseType = HttpResponse<Note[]>;
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }


  getNote():Observable<any>{
    return this.http.get(resourceUrl);
  }


  createNoteOffice(request: any): Observable<any> {
  return this.http.post(noteOfficeResourceUrl, request);
}



createNoteSuperieur(request:any):Observable<any>{

  return this.http.post(noteSuperieurProposer,request);
}

createNoteAgent(request:any):Observable<any>{

  return this.http.post(noteAgentProposer,request);
}


updateNote(request: Note, id: number): Observable<Note> {
  return this.http.put(`${noteUpdateUrl}/${id}`, request);
}

getNoteCourante(id: any): Observable<Note> {
  return this.http.get(`${noteCouranteResourceUrl}/${id}`);
}


update(request: Note): Observable<Note> {
  return this.http.put(resourceUrl, request);
}

printNote(matricule: string, annee: string) {
  
  let param = new HttpParams().set("annee", annee); // passer un parametre a l'URL
  return this.http.get(`${printNoteUrl}/${matricule}`, {params: param, responseType: 'blob' as 'json'});
}

getNoteActivite(matricule: string, annee: any){
  return this.http.get(`${noteActiviteUrl}/${matricule}/${annee}`);
}

acceptNote(request: Note): Observable<Note>{
  return this.http.put(`${acceptNoteUrl}/${request.id}`, request);
}

rejectNote(request: Note): Observable<Note>{
  return this.http.put(`${rejectNoteUrl}/${request.id}`, request);
}

getAllNote(event?: LazyLoadEvent):Observable<GetAllNote> {
  return this.http.get(resourceUrl, {observe:'response'})
  .pipe(map(response=> {
          let noteResponse: GetAllNote = {
            //  totalCount: parseInt(response.headers.get(totalCountHeader)),
            notes: response.body as Note[],
          };
          return noteResponse;
        }));
}

getCritereNote(note: Note): Observable<Note> {
  return this.http.get(`${baseUrl}/notes/${note.id}`);
}

query(req?: any): Observable<EntityArrayResponseType> {
  const options = createRequestOption(req);
   return this.http.get<Note[]>(resourceUrl, { params: options, observe: 'response' });
}


}
