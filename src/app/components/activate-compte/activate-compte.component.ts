import { Component, OnInit } from '@angular/core';
import { Fonctionnaire } from 'src/app/models/fonctionnaire';
import { MinistereInstitution } from 'src/app/models/ministere-institution';
import { Profil } from 'src/app/models/profil';
import { AuthService } from 'src/app/services/auth.service';
import { MinistereInstitutionService } from 'src/app/services/ministere-institution.service';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-activate-compte',
  templateUrl: './activate-compte.component.html',
  styleUrls: ['./activate-compte.component.css']
})
export class ActivateCompteComponent implements OnInit {
 fonctionnaire: Fonctionnaire={};
 pwdConfirmation:String='';
 ministereInstitutions: MinistereInstitution[] =[];
 ministereInstitution: MinistereInstitution={};
 profils: Profil[] =[];
 element: Profil[] =[];
 profil: Profil={};
 isSuccessful:boolean=false;
 message: any ;
 filteredMinisteresI: MinistereInstitution[]=[];
 filteredProfils: Profil[]=[];
 isLoggedIn = false;
 isSuccessFailed = false;
 errorMessage = '';


  constructor(private authServive:AuthService,
    private ministereInstitutionService : MinistereInstitutionService,
    private profilService: ProfilService) { 


  }


  ngOnInit(): void {
    this.loadMinisteresInstitutions();
    this.loadProfils();
  }

  activateCompte(){
    this.authServive.activateAccount(this.fonctionnaire).subscribe(data=>{
      this.isSuccessful=true;
      this.isSuccessFailed = false;
      // console.log(JSON.stringify(this.isSuccess));
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSuccessFailed = true;
    })

  }


  loadMinisteresInstitutions(){
    this.ministereInstitutionService.getAll().subscribe(response => {
      this.ministereInstitutions = response.ministereInstitutions;
    });
  }

  
  loadProfils(){
    let query = "Admin";
    let query1 = "admin";
    this.profilService.getAll().subscribe(response => {
      for (let index = 0; index < response.profils.length; index++) {
        let element = response.profils[index];
      if (element.libelle!.toLowerCase().indexOf(query.toLowerCase()) < 0   ||
      element.libelle!.toLowerCase().indexOf(query1.toLowerCase()) < 0 ) {
        this.profils.push(element);
      }
      }
      this.profils  = this.profils;
    });
  }
  filteredMinistere(event:any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : MinistereInstitution[] = [];
    let query: string = event.query ?? '';

    for(let i = 0; i < this.ministereInstitutions.length; i++) {
        const ministereInstitution: MinistereInstitution = this.ministereInstitutions[i];
        // console.log(ministereInstitution.libelle)
        if (ministereInstitution.libelle?.toLowerCase().indexOf(query.toLowerCase())===0) {
            filtered.push(ministereInstitution);
        }
    }
    
    this.filteredMinisteresI = filtered;
}

filteredProfil(event:any) {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let filtered : Profil[] = [];
  let query: string = event.query ?? '';

  for(let i = 0; i < this.profils.length; i++) {
      const profil: Profil = this.profils[i];
      // console.log(ministereInstitution.libelle)
      if (profil.libelle?.toLowerCase().indexOf(query.toLowerCase())===0) {
          filtered.push(profil);
      }
  }
  
  this.filteredProfils = filtered;
}


}
