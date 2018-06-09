import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service'
import { Producto } from '../productos';
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

  constructor(private ProductosService: ProductosService, private modalService: NgbModal,
    private toasterManagerService: ToasterManagerService) { }

  //Opciones de busqueda.
  opciones = ['ID', 'Nombre'];
  //Opcion por default.
  opcionSeleccionada: any = 'ID';
  private datosProductos: Producto[];
  config = configToasterManager;
  ngOnInit() {
    this.getProductos();
  }

  getProductos(): void {
    this.ProductosService.consultarProductos()
      .subscribe(res => this.datosProductos = res['data']);
    //.subscribe(res => console.log(res));
  }

  //Abrir modal, para insertar o para modificar.
  abrirModal(Producto: Producto) {
    const modalRef = this.modalService.open(InsertarComponent);
    modalRef.componentInstance.datosProductos = this.datosProductos;
    modalRef.componentInstance.producto = Producto;
  }

  //Al dar clic al boton de eliminar.
  borrarProducto(producto: Producto) {
    const posicion = this.datosProductos.findIndex(
      (func: Producto) => {
        return func.ID === producto.ID;
      },
    );
    this.ProductosService.borrarProducto(producto)
      .subscribe(() => this.datosProductos.splice(posicion, 1),
    );
    this.toasterManagerService.makeToast('success', 'Eliminar', 'Producto eliminado');
  }


}
