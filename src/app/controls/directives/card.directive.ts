import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[card]',
})
export class CardDirective {
  @HostBinding('class') private get class() {
    return 'p-4 bg-primary-dark rounded border border-neutral-800 shadow';
  }
}
