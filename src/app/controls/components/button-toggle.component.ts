import {
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  template: `<button
    class="p-2"
    [ngClass]="
      toggled
        ? 'bg-neutral-950 hover:!bg-neutral-800'
        : 'bg-secondary-dark hover:!bg-neutral-700'
    "
    (click)="onClick()"
  >
    <ng-content></ng-content>
  </button>`,
})
export class ButtonToggleComponent {
  @Input() value: any;
  @Input() color?: string;

  @Output() click = new EventEmitter<any>();

  onClick() {
    this.click.emit(this.value);
  }

  toggled = false;
}
