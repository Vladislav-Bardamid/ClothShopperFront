import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[form-control]',
})
export class FormControlDirective {
  @HostBinding('class') private get class() {
    return '!rounded dark:!bg-secondary-dark border dark:!border-neutral-700 focus-within:ring-1 ring-blue-600';
  }
}
