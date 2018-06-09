import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarComponent } from './consultar/consultar.component';
import { ThemeModule } from '../../@theme/theme.module';
import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';
import { FiltroPipe } from './filtro.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { InventarioService } from './inventario.service';
import { InsertarComponent } from './insertar/insertar.component';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    InventarioRoutingModule,
    NgxPaginationModule,
    ToasterModule.forRoot()
  ],
  declarations: [InventarioComponent, ConsultarComponent, FiltroPipe, InsertarComponent],
  providers: [InventarioService, ToasterManagerService],
  entryComponents: [InsertarComponent]
})
export class InventarioModule { }
