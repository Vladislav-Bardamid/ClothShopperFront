import {
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `<div
    class="fixed bg-secondary-dark rounded p-2 mt-1 after:hidden after:absolute after:top-full after:left-1/2 after:-translate-x-1/2"
  ></div>`,
})
export class TooltipComponent implements OnInit {
  @Input() text: any;
  @Input() left = 0;
  @Input() top = 0;

  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
