import { MinistereInstitution } from "./ministere-institution";

export interface Periode {
    id?: number;
    dateDebut?: string;
    dateFin?: string;
    periodType?:string;
    ministereInstitution?:MinistereInstitution;

}



