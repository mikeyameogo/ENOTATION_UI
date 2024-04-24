import { Injectable } from '@angular/core';
import { IAffiliationStep } from '../model/affiliation-step';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {IFileResult} from "../model/fileResult";

type EntityResponseType = HttpResponse<IFileResult>;

const resourceUploadFile = environment.resourceUploadFile;
const resourceRetrieveFile = environment.resourceUploadFile;


@Injectable({
  providedIn: 'root'
})
export class FileService {

    constructor(protected http: HttpClient) {}
    uploadPhotoImmatriculation(
        file: File,
    ): Observable<EntityResponseType> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post<IFileResult>(resourceUploadFile, formData, { observe: 'response' });
    }

    async getPhotoRessourceFile( fileUrl: string): Promise<string> {
        const response = await this.getFile(fileUrl)
            .toPromise()
            .catch(e => {
                console.log('Error: ', e.message);
            });
        if (response) {
            const file = new Blob([response], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            return fileURL;
        } else {
            return '';
        }
    }

    private getFile(
        fileUrl: string,
    ): Observable<any> {
        const httpOptions = {
            responseType: 'arraybuffer' as 'json',
        };
        const formData: FormData = new FormData();
        formData.append('fileUrl', fileUrl);
        return this.http.post(resourceRetrieveFile, formData, httpOptions);
        }
}
