import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { INVENTORYComponent } from './inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: INVENTORYComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'clientes',
      loadChildren: './clientes/clientes.module#ClientesModule',
    },
    {
      path: 'productos',
      loadChildren: './productos/productos.module#ProductosModule',
    },
    {
      path: 'inventario',
      loadChildren: './inventario/inventario.module#InventarioModule',
    },
    {
      path: 'facturacion',
      loadChildren: './clientes/clientes.module#ClientesModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class INVENTORYRoutingModule {
}
