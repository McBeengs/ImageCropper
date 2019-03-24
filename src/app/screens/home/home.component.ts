import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { LocalStorageService } from './../../shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('pathName') pathName: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private electronService: ElectronService,
    private localStorage: LocalStorageService
  ) { }

  selectDirectory() {
    if (this.electronService.isElectronApp) {
      const path = this.electronService.remote.dialog.showOpenDialog(null, {
        properties: ['openDirectory']
      })[0];

      this.pathName.nativeElement.value = path;
      this.nextButton.nativeElement.disabled = false;
    }
  }

  nextButtonClick() {
    this.localStorage.setPath(this.pathName.nativeElement.value);
    this.router.navigate(['/select-image']);
  }
}
