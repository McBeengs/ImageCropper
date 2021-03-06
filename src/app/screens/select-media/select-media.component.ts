import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  Renderer2
} from '@angular/core';
import { FileModel } from 'src/app/shared/models/FileModel';
import { ElectronService } from 'ngx-electron';
import { ImageThumbnailComponent } from './components/image-thumbnail.component';
import { LocalStorageService } from '../../shared/services/local-storage.service';

const remote = require('electron').remote;
const fs = remote.require('fs');

@Component({
  selector: 'app-select-media',
  templateUrl: './select-media.component.html',
  styleUrls: ['./select-media.component.css']
})
export class SelectMediaComponent {

  @ViewChild('pathName') pathName: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;
  @ViewChild('folderContainer') folderContainer: ElementRef;
  @ViewChild('mediaContainer') mediaContainer: ElementRef;

  fileCount: number;
  path: string; // Absolute root folder path
  filelist: string[]; // List of all absolute paths for the files founded on the path variable above
  files: Array<FileModel>; // Array of fully populated objects representing the files above
  txtName: string;

  selectedOption: string;
  options = [
    { name: "Name (Alphabetically)", value: 'name' },
    { name: "Date (Oldest to Newest)", value: 'date-old-new' },
    { name: "Date (Newest to Oldest)", value: 'date-new-old' },
    { name: "Size (Big to Small)", value: 'size-big-small' },
    { name: "Size (Small to Big)", value: 'size-small-big' }
  ];

  @ViewChild('dynamicFiles', { read: ViewContainerRef }) dynamicFiles: ViewContainerRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetector: ChangeDetectorRef,
    private electronService: ElectronService,
    private localStorage: LocalStorageService,
    private renderer: Renderer2
  ) {
    this.path = localStorage.getPath();
  }

  selectDirectory() {
    if (this.electronService.isElectronApp) {
      const path = this.electronService.remote.dialog.showOpenDialog(null, {
        properties: ['openDirectory']
      })[0];

      this.pathName.nativeElement.value = path;
      this.localStorage.setPath(path);
      this.path = path;

      this.nextButton.nativeElement.disabled = false;
    }
  }

  async listFilesClick() {
    // Parse the directory
    fs.readdir(this.path, (err, files) => {
      this.filelist = files;
      this.files = new Array<FileModel>();
      this.selectedOption = "Date (Newest to Oldest)";

      for (const file of this.filelist) {
        if (file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".bmp")) {
          const model: FileModel = new FileModel();
          model.id = this.files.length + 1;
          model.name = file;
          model.path = this.path + "\\" + file;

          const test = fs.statSync(model.path);
          model.createDate = test.birthtime;
          model.size = test.size;
          model.sizeText = this.formatBytes(test.size, 1);

          this.files.push(model);
        }
      }

      this.displayFilesByFilters();

      this.renderer.setStyle(this.folderContainer.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.mediaContainer.nativeElement, 'display', 'block');
      this.changeDetector.detectChanges();

    });

  }

  insertNewFileDynamically(file: FileModel) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ImageThumbnailComponent);
    const componentRef = this.dynamicFiles.createComponent(factory);
    componentRef.instance.model = file;
  }

  displayFilesByFilters() {
    this.dynamicFiles.clear();
    let filesToDisplay: Array<FileModel> = new Array<FileModel>();

    for (const model of this.files) {
      if (this.txtName !== undefined && this.txtName !== '') {
        if (model.name.indexOf(this.txtName) !== -1) {
          filesToDisplay.push(model);
        }
      } else {
        filesToDisplay.push(model);
      }
    }

    switch (this.options.filter((v) => v.name === this.selectedOption)[0].value) {
      case 'name':
        filesToDisplay = filesToDisplay.sort((a, b) => a.name > b.name ? 1 : -1);
        break;
      case 'date-old-new':
        filesToDisplay = filesToDisplay.sort((a, b) => a.createDate > b.createDate ? 1 : -1);
        break;
      case 'date-new-old':
        filesToDisplay = filesToDisplay.sort((a, b) => a.createDate < b.createDate ? 1 : -1);
        break;
      case 'size-big-small':
        filesToDisplay = filesToDisplay.sort((a, b) => a.size < b.size ? 1 : -1);
        break;
      case 'size-small-big':
        filesToDisplay = filesToDisplay.sort((a, b) => a.size > b.size ? 1 : -1);
        break;
    }

    for (const model of filesToDisplay) {
      this.insertNewFileDynamically(model);
    }
  }

  formatBytes(bytes: number, decimals: number): string {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
