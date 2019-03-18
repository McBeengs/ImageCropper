import { FileModel } from '../models/FileModel';
import { Injectable } from '@angular/core';


@Injectable()
export class LocalStorageService {
    // Path that the users select on the "Home" screen
    public getPath(): string {
        const pathData = localStorage.getItem("path");
        return JSON.parse(pathData);
    }

    public setPath(path: string) {
        localStorage.setItem("path", JSON.stringify(path));
    }

    // Model of the file that the user has selected to crop
    public getFileModel(): FileModel {
        const fileModelData = localStorage.getItem("fileModel");
        return JSON.parse(fileModelData);
    }

    public setFileModel(fileModel: FileModel) {
        localStorage.setItem("fileModel", JSON.stringify(fileModel));
    }
}
