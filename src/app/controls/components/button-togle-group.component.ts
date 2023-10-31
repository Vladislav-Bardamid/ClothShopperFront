import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ButtonDirective } from '../directives/button.directive';
import { ButtonToggleComponent } from './button-toggle.component';

@Component({
  selector: 'app-button-toggle-group',
  template: `<div
    class="rounded overflow-hidden border border-neutral-700 divide-x divide-neutral-700 flex"
  >
    <ng-content></ng-content>
  </div>`,
})
export class ButtonGroupComponent implements AfterContentInit {
  @ContentChildren(ButtonToggleComponent)
  buttons!: QueryList<ButtonToggleComponent>;

  @Input() value?: any;
  @Output() valueChange = new EventEmitter<any>();

  constructor() {}

  ngAfterContentInit(): void {
    this.update(this.value);

    this.buttons.forEach((button) => {
      button.click.subscribe((value) => {
        this.update(value);
        this.valueChange.emit(value);
      });
    });
  }

  update(value: any) {
    this.buttons.forEach((button) => {
      button.toggled = button.value === value;
    });
  }
}
