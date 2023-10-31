import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
import { ControlsModule } from 'src/app/controls/controls.module';

@NgModule({
  imports: [CommonModule, OrderRoutingModule, ControlsModule],
  exports: [],
  declarations: [OrderListComponent, OrderHistoryComponent],
  providers: [],
})
export class OrderModule {}
