import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main-album-loading-error',
  templateUrl: './album-loading-error.component.html',
  styleUrls: ['./album-loading-error.component.css'],
})
export class AlbumLoadingErrorComponent {
  @Input() text = '';

  @Output() onUpdate = new EventEmitter();
}
