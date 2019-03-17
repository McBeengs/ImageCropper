import { ImageThumbnailComponent } from './components/image-thumbnail.component';
import {
  Component, OnInit, AfterViewInit, ViewContainerRef, ViewChild,
  ComponentRef, ComponentFactoryResolver, Inject
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileModel } from './models/FileModel';

const remote = require('electron').remote;
const fs = remote.require('fs');

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent implements OnInit, AfterViewInit {

  path: string; // Absolute root folder path
  filelist: string[]; // List of all absolute paths for the files founded on the path variable above
  files: Array<FileModel>; // Array of fully populated objects representing the files above
  dynamicalyAddedFiles = [];

  @ViewChild('dynamicFiles', { read: ViewContainerRef }) dynamicFiles: ViewContainerRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.path = this.route.snapshot.paramMap.get('path');
    // this.path = "\\\\THEONETOYETBENA\\Repository\\FurAffinity\\Aikega\\";
  }

  ngOnInit() {
    // Parse the directory
    this.filelist = fs.readdirSync(this.path);
    this.files = new Array<FileModel>();
  }

  ngAfterViewInit() {
    this.filelist.forEach((file: string) => {
      if (file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".bmp")) {
        const model: FileModel = new FileModel();
        model.id = this.files.length + 1;
        model.name = file;
        model.path = this.path + "\\" + file;

        fs.stat(model.path, (err: any, stats: any) => {
          model.createDate = stats.birthtime;
          model.size = stats.size;

          this.files.push(model);
          this.insertNewFileDynamically(model);
        });
      }
    });
  }

  insertNewFileDynamically(file: FileModel) {
    
  }
}
