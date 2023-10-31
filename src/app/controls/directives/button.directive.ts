import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[button]',
})
export class ButtonDirective {
  @Input() button?: string;

  @HostBinding('class') private get class() {
    var colorClass = 'bg-secondary-dark hover:bg-neutral-700';

    switch (this.button) {
      case 'gray':
        colorClass = 'bg-gray-800 hover:bg-gray-700';
    }

    return `p-2 ${colorClass} border border-neutral-700 hover:border-neutral-700 rounded`;
  }
}
