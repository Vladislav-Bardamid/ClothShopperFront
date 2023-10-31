import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { ButtonGroupComponent } from './components/button-togle-group.component';
import { ButtonToggleComponent } from './components/button-toggle.component';
import { FormControlDirective } from './directives/form-control.directive';
import { CardDirective } from './directives/card.directive';

const components = [
  ButtonDirective,
  FormControlDirective,
  CardDirective,
  ButtonToggleComponent,
  ButtonGroupComponent,
];

@NgModule({
  declarations: [components],
  imports: [CommonModule],
  exports: [components],
})
export class ControlsModule {}
