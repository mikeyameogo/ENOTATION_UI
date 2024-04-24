export interface IFonction {
    id?: number;
    code?: string;
    libelle?: string;
}

export class Fonction implements IFonction {
    constructor(
        public id?: number,
        public code?: string,
        public libelle?: string
    ){}
}