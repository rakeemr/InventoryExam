import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarComponent } from './consultar/consultar.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ClientesService } from './clientes.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroPipe } from './filtro.pipe';
import { InsertarComponent } from './insertar/insertar.component';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { ToasterModule } from 'angular2-toaster';
import { ModalConfirmacionComponent } from './modal-confirmacion/modal-confirmacion.component';
import { ModalConfirmacionService } from './modal-confirmacion/modal-confirmacion.service';
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ClientesRoutingModule,
    NgxPaginationModule,
    ToasterModule.forRoot(),
  ],
  declarations: [ClientesComponent, ConsultarComponent, FiltroPipe, InsertarComponent, ModalConfirmacionComponent],
  providers: [ClientesService, ToasterManagerService, ModalConfirmacionService],
  entryComponents: [InsertarComponent, ModalConfirmacionComponent],
})
export class ClientesModule { }
