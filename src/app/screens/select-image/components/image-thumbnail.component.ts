import { FileModel } from './../models/FileModel';
import { Component, OnInit, Input } from '@angular/core';

// <div class="col-md-3">
//         <div id="thumbnail-container-{{file.id}}">
//             <img id="thumb-file-{{file.id}}" [src]="file.path | safeurl" class="file-thumbnail" />
//             <p>{{file.createDate}}</p>
//             <p>{{file.size}}</p>
//         </div>
//     </div>

@Component({
    selector: 'app-image-thumbnail',
    template: "<h2>{{message}}</h2>",
    styles: [""]
})
export class ImageThumbnailComponent {

    @Input() message: string;

    constructor() {
    }
}
