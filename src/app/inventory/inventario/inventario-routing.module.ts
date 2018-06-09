import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './inventario.component';
import { ConsultarComponent } from './consultar/consultar.component';
const routes: Routes = [{
    path: '',
    component: InventarioComponent,
    children: [
        {
            path: 'consultar',
            component: ConsultarComponent,
        },
        // Add the next components here
    ],
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InventarioRoutingModule { }

