import { NgModule } from '@angular/core';

import { INVENTORYComponent } from './inventory.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { INVENTORYRoutingModule } from './inventory-routing.module';
import { ThemeModule } from '../@theme/theme.module';
const INVENTORY_COMPONENTS = [
  INVENTORYComponent,
];

@NgModule({
  imports: [
    INVENTORYRoutingModule,
    ThemeModule,
    DashboardModule,
  ],
  declarations: [
    ...INVENTORY_COMPONENTS,
  ],
})
export class INVENTORYModule {
}
