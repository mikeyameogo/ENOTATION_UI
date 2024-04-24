import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Fonctionnaire } from 'src/app/shared/model/fonctionnaire';
import { FonctionnaireService } from 'src/app/shared/service/fonctionnaire.service';

@Component({
  selector: 'app-changer-affiliation',
  templateUrl: './changer-affiliation.component.html',
  styleUrls: ['./changer-affiliation.component.scss'],
  providers: [MessageService]
})
export class ChangerAffiliationComponent implements OnInit{

  @ViewChild('dtf')
  form!: NgForm;
  submitted!: boolean;
  saveSuccess: boolean = false;
  ancienCode!: string;
  nouveauCode!: string;
  reference!: string;
  motif!: string;
  message: any;
  superieur!: Fonctionnaire;
  sup: boolean = false;
  isDialogOpInProgress: any;

  constructor(private fonctionnaireService: FonctionnaireService, private messageService: MessageService) { }
  ngOnInit(): void {
  }

  // ngOnDestroy() {
  //   clearTimeout(this.timeoutHandle);
  // }

  verifier(){
    if(!this.reference || !this.motif || !this.ancienCode || !this.nouveauCode){
      this.messageService.add(
        {severity:'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires !!! ', life: 15000}
        );
        
    } else{
    this.fonctionnaireService.VerifierAffiliation(this.nouveauCode).subscribe(
      data => {this.superieur=data;
        this.sup = true;
      console.error("les infos du superieurs sont:", this.superieur)},
      err => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Code incorrect, vérifiez le nouveau code que vous avez saisi !!!', life: 15000 });
      }
    );
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Succès', detail: 'Vous avez changé de supérieur hiérarchique avec succès !!! ', life: 60000 });
  }

  showError() {
    this.messageService.add(
      {severity:'error', summary: 'Erreur', detail: 'Echec du changement de supérieur, vérifiez votre code supérieur !!! ', life: 15000}
      );
  }

  reloadPage(){
    setTimeout(()=>{
      location.reload();
    }, 400);
  }
  
  public save() {
    this.submitted = true;
    if(!this.reference || !this.motif || !this.ancienCode || !this.nouveauCode){
      this.messageService.add(
        {severity:'error', summary: 'Erreur', detail: 'Tous les champs sont obligatoires !!! ', life: 15000}
        );
    } else{
    this.fonctionnaireService.changerAffiliation(this.ancienCode, this.nouveauCode, 
      this.reference, this.motif).subscribe(
      data => {
        this.saveSuccess = true;
        this.showSuccess();
        this.reloadPage();
      },
      err => {
        this.message = err.message;
        this.saveSuccess = false;
        this.showError();
        this.reloadPage();
      }
    )
    }   
  }

 public clear(){
  this.sup = false;

 }

}
