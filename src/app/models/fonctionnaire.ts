import { MinistereInstitution } from "./ministere-institution";
import { Profil } from "./profil";

export interface Fonctionnaire {
    id?:number|null;
    nom?:string;
    prenom?:string;
    telephone?:string;
    adresse?:string;
    echelon?:string;
    echelle?:string;
    classe?:string;
    categorie?:string;
    resetKey?:string;
    resetDate?:Date;
    ministereInstitution?:MinistereInstitution;
    fonction?:string;
    sexe?:string;
    sousPosition?:string;
    uniteAdministrative?:string;
    codeAffiliation?:string;
    codeGenere?:string;
    password?:string;
    profil?:Profil;
    matricule?:string;
    emailAddress?:string;
    actif?:boolean;

}

export class ChangePasswordVo{
    currentPassword?:string;
    newPassword?:string;
}
