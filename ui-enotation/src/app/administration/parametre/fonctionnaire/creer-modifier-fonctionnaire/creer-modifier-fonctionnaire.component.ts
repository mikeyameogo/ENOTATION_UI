import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IFonctionnaire, Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { IMinistere, Ministere } from 'src/app/shared/model/ministere';
import { IFonction } from 'src/app/shared/model/fonction';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';
import { MinistereService } from 'src/app/shared/service/ministere.service';
import { FonctionService } from 'src/app/shared/service/fonction.service';
import { LISTE_SEXES } from 'src/app/shared/constants/liste.constants';
import { IProfilAgent } from 'src/app/shared/model/profil-agent';
import { ProfilAgentService } from 'src/app/shared/service/profil-agent.service';

@Component({
  selector: 'app-creer-modifier-fonctionnaire',
  templateUrl: './creer-modifier-fonctionnaire.component.html',
  styleUrls: ['./creer-modifier-fonctionnaire.component.scss']
})
export class CreerModifierFonctionnaireComponent {
  @ViewChild('dtf') form!: NgForm;
  fonctionnaire: IFonctionnaire = new Fonctionnaire();
  @Input() data: IFonctionnaire = new Fonctionnaire();
  fonctionnaires: IFonctionnaire[]=[];
  profils: IFonction[]=[];
  ministeres: IMinistere[]=[];
 // parents: ICategorie[]=[];
  error: string | undefined;
  showDialog = false;
  isDialogOpInProgress!: boolean;
  message: any;
  dialogErrorMessage: any;
  timeoutHandle: any;
  isOpInProgress!: boolean;
  listeSexes = LISTE_SEXES;
  profils_agent: IProfilAgent[]=[];

  constructor(
    private fonctionnaireService: FonctionnaireService,
    private profileService: FonctionService,
    private ministereService: MinistereService,
    private profilAgentService: ProfilAgentService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialog: DynamicDialogConfig,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadProfil();
    this.loadMinistere();
    this.loadProfilAgent();
    if (this.dynamicDialog.data) {
      this.fonctionnaire = cloneDeep(this.dynamicDialog.data);
    }

  }

  loadProfilAgent(event?: LazyLoadEvent) {
    this.profilAgentService.findAll().subscribe(response => {
      this.profils_agent = response.body!;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }
 loadMinistere(event?: LazyLoadEvent) {
    this.ministereService.findAll().subscribe(response => {
      this.ministeres = response.body!;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadProfil(event?: LazyLoadEvent) {
    this.profileService.findAll().subscribe(response => {
      this.profils = response.body!;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  clear(): void {
    this.form.resetForm();
    this.dialogRef.close();
    this.dialogRef.destroy();
  }
  isEditing() {
    return !!this.fonctionnaire.id;
  }

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }
  // Errors
  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.title;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }
  saveEntity(): void {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    if (this.fonctionnaire) {
      if (this.fonctionnaire.id) {
        this.fonctionnaireService.update(this.fonctionnaire).subscribe(
          {
            next: (response) => {
              this.dialogRef.close(response);
              this.dialogRef.destroy();
              this.showMessage({ severity: 'success', summary: 'fonctionnaire modifié avec succès' });

            },
            error: (error) => {
              console.error("error" + JSON.stringify(error));
              this.isOpInProgress = false;
              this.showMessage({ severity: 'error', summary: error.error.message });

            }
          });
      } else {
        this.fonctionnaireService.create(this.fonctionnaire).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
            this.dialogRef.destroy();
            this.showMessage({
              severity: 'success',
              summary: 'fonctionnaire creer avec succès',
            });
          },
          error: (error) => {
            console.error("error" + JSON.stringify(error));
            this.isOpInProgress = false;
            this.showMessage({ severity: 'error', summary: error.error.message });

          }
        });
      }
    }
  }


}

