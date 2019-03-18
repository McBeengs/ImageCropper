export class FileModel {
    id: number;
    name: string;
    path: string;
    createDate: string;
    size: number;
    sizeText: string;

    public FileModel() {
        this.id = 0;
        this.name = "[empty]";
        this.path = "[empty]";
        this.createDate = "[empty]";
        this.size = 0;
    }
}
