import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { CURRENT_PAGE, MAX_SIZE_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Activite, IActivite } from 'src/app/shared/model/activite';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { Note } from 'src/app/shared/model/note';
import { ActiviteService } from 'src/app/shared/service/activite.service';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { NoteService } from 'src/app/shared/service/note.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-superieur-hierarchique-home',
  templateUrl: './superieur-hierarchique-home.component.html',
  styleUrls: ['./superieur-hierarchique-home.component.scss']
})
export class SuperieurHierarchiqueHomeComponent {

  activites: IActivite[] =[];
  fonctionnaires: Fonctionnaire[] =[];
  activite: IActivite = new Activite();
  isLoggedIn = false;
  matricule!: string;
  message: any ;
  notes: Note[]=[];
  isLoading: boolean = false;
  recordsPerPage = environment.recordsPerPage;
  totalRecords!: number;
  page = CURRENT_PAGE;
  previousPage?: number;
  maxSize = MAX_SIZE_PAGE;
  predicate!: string;
  ascending!: boolean;
  reverse: any;
  filtreLibelle: string | undefined;
  anneeActu! : Date;
  nbTache!: number;
  nbNote!: number;
  nbAgent!: number;
  
  constructor(private activiteService: ActiviteService,
    private tokenStorageService: TokenStorageService,
    private noteService : NoteService,
    private fonctionnaireService: FonctionnaireService
  ) {}

  ngOnInit(): void {
    this.anneeActu = new Date();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.matricule = user.matricule;
    }

    this.load();
    this.loadNote();
    this.loadAllAgent();
  }

  load(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.activiteService.getAll(this.matricule,this.anneeActu.getFullYear(),event).subscribe(response => {
      this.isLoading = false;
      this.nbTache= response.activites.length;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadNote(event?: LazyLoadEvent) {
    this.isLoading = true;
    this.noteService.getAllNote(event).subscribe((response: { notes: string | any[]; }) => {
      this.isLoading = false;
      this.nbNote = response.notes.length;
    }, (error: { error: any; }) => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadAllAgent(): void {
    const req = this.buildReq();
    this.fonctionnaireService.getAllAgent(req).subscribe(result => {
      if (result && result.body) {
        this.totalRecords = Number(result.headers.get('X-Total-Count'));
        this.fonctionnaires = result.body || [];
        this.nbAgent = result.body.length;
      }
    });
  }

  buildReq(): any {
    let req = {
      page: this.page -1,
      size: this.recordsPerPage,
      sort: this.sortMethod(),
    };
    let obj : any;
    if (this.filtreLibelle) {
      obj = {};
      obj['libelle.contains'] = this.filtreLibelle;
      req = Object.assign({}, req, obj);
    }
    return req;
  }

  sortMethod(): string[] {
    this.predicate = 'id';
    this.reverse = true;
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    return result;
  }

}
