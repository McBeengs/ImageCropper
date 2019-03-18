import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { FileModel } from 'src/app/shared/models/FileModel';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { NgxCroppieComponent } from 'ngx-croppie';

const sizeOf = require('image-size');

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit {

  fileModel: FileModel;
  imageWidth: number;
  imageHeight: number;
  /* Our cropped image and the value of our image controller */
  public croppieImage;
  public imgCropToHeight = '400';
  public imgCropToWidth = '400';
  @ViewChild('targetDiv') targetDiv: ElementRef;
  @ViewChild('ngxCroppie') ngxCroppie: NgxCroppieComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private localStorage: LocalStorageService
  ) {
    this.fileModel = localStorage.getFileModel();
  }

  ngOnInit() {
    const dimensions = sizeOf(this.fileModel.path);
    this.imageWidth = dimensions.width;
    this.imageHeight = dimensions.height;

    this.onResize();
    // this.changeDetector.detectChanges();
  }

  public get croppieOptions(): any {
    const opts: any = {};
    opts.viewport = {
      width: parseInt(this.imgCropToWidth, 10),
      height: parseInt(this.imgCropToHeight, 10)
    };
    
    return opts;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.renderer.setStyle(this.targetDiv.nativeElement, "height", (window.innerHeight - 145) + "px");
  }

  newImageResultFromCroppie(img: string) {
    this.croppieImage = img;
  }
}
