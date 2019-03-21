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
  windowX: number;
  windowY: number;
  @ViewChild('targetDiv') targetDiv: ElementRef;

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
    this.windowX = 0;
    this.windowY = 0;

    this.onResize();
    // this.changeDetector.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.renderer.setStyle(this.targetDiv.nativeElement, "height", (window.innerHeight - 145) + "px");
  }

  onDragMoving(event: any) {
    this.windowX = event.x;
    this.windowY = event.y;
  }
}
