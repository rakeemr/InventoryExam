import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { FacturacionComponent } from './facturacion.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    FacturacionComponent,
  ],
})
export class FacturacionModule { }
