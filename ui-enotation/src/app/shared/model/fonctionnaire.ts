import { Ministere } from "./ministere";
import { IFonction } from "./fonction";
import { IProfilAgent } from "./profil-agent";
import { Note } from "./note";

export interface IFonctionnaire {
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
    ministereInstitution?:Ministere;
    fonction?:string;
    sexe?:string;
    sousPosition?:string;
    uniteAdministrative?:string;
    codeAffiliation?:string;
    codeGenere?:string;
    password?:string;
    profil?:IFonction;
    matricule?:string;
    emailAddress?:string;
    actif?:boolean;
    profil_agent?:IProfilAgent;

}

export class Fonctionnaire implements IFonctionnaire{
    constructor(
      public  id?:number|null,
      public  nom?:string,
      public  prenom?:string,
      public  telephone?:string,
      public  adresse?:string,
      public  echelon?:string,
      public  echelle?:string,
      public  classe?:string,
      public  categorie?:string,
      public profil_agent?:IProfilAgent,
      public  resetKey?:string,
      public  resetDate?:Date,
      public  ministereInstitution?:Ministere,
    public  fonction?:string,
    public   sexe?:string,
    public  sousPosition?:string,
    public  uniteAdministrative?:string,
    public  codeAffiliation?:string,
    public  codeGenere?:string,
    public  password?:string,
    public  profil?:IFonction,
    public  matricule?:string,
    public  emailAddress?:string,
    public  actif?:boolean
       
    ){}
}

export interface IFoncNote {
  note?: Note,
  fonctionnaire?: Fonctionnaire 
}


export class FoncNote implements IFoncNote{
  constructor(
    public note?: Note,
    public fonctionnaire?: Fonctionnaire
    ) {}
}