import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarComponent } from './consultar/consultar.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { FiltroPipe } from './filtro.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductosService } from './productos.service';
import { InsertarComponent } from './insertar/insertar.component';
import { ToasterManagerService } from '../../@core/toast/toaster-manager.service';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ProductosRoutingModule,
    NgxPaginationModule,
    ToasterModule.forRoot()
  ],
  declarations: [ProductosComponent, ConsultarComponent, FiltroPipe, InsertarComponent],
  providers: [ProductosService, ToasterManagerService],
  entryComponents: [InsertarComponent]
})
export class ProductosModule { }
