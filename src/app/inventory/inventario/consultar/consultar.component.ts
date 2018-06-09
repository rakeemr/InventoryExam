import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service'
import { Inventario } from '../inventario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InsertarComponent } from '../insertar/insertar.component';

import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit {

  constructor(private InventarioService: InventarioService, private modalService: NgbModal,
    private toasterManagerService: ToasterManagerService) { }

  //Opciones de busqueda.
  opciones = ['ID', 'Producto'];
  //Opcion por default.
  opcionSeleccionada: any = 'ID';
  private datosInventario: Inventario[];
  config = configToasterManager;
  ngOnInit() {
    this.getInventario();
  }

  getInventario(): void {
    this.InventarioService.consultarInventario()
      .subscribe(res => this.datosInventario = res['data']);
    //.subscribe(res => console.log(res));
  }

  //Abrir modal, para insertar o para modificar.
  abrirModal(Inventario: Inventario) {
    const modalRef = this.modalService.open(InsertarComponent);
    modalRef.componentInstance.datosInventario = this.datosInventario;
    modalRef.componentInstance.inventario = Inventario;
  }

  //Al dar clic al boton de eliminar.
  borrarInventario(inventario: Inventario) {
    const posicion = this.datosInventario.findIndex(
      (func: Inventario) => {
        return func.ID === inventario.ID;
      },
    );
    this.InventarioService.borrarInventario(inventario)
      .subscribe(() => this.datosInventario.splice(posicion, 1),
    );
    this.toasterManagerService.makeToast('success', 'Eliminar', 'Inventario eliminado');
  }


}
