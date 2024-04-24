
export interface IMinistere{
    id?: number;
    libelle?: string;
    code?: string;
    section?: string;


}


export class Ministere implements IMinistere{
    constructor(
        public id?: number,
        public libelle?: string,
        public code?: string,
        public section?: string

    ){}
}
