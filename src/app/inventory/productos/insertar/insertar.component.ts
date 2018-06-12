import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Producto } from '../productos'
import { ProductosService } from '../productos.service';


import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.scss']
})
export class InsertarComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private ProductosService: ProductosService,
    private toasterManagerService: ToasterManagerService) { }

  @Input() producto: Producto;
  @Input() datosProductos;

  private solicitudActual;

  private Productos;
  private titulo;

  config = configToasterManager;

  desabilitado: boolean;

  ngOnInit() {
    this.solicitudActual = new Producto();
    this.ProductosService.consultarProductos()
      .subscribe(res => this.Productos = res);

    //Si se inicia para insertar    
    if (this.producto == null) {
      this.solicitudActual = new Producto();
      this.titulo = 'Insertar';
    }

    //Si se inicia para modificar    
    else {
      this.titulo = 'Modificar';
      this.desabilitado = false;
      this.solicitudActual = Object.assign({}, this.solicitudActual, this.producto);
    }
  }


  guardarDatos() {
    //Si se inicia para insertar    
    if (this.producto == null) {
      this.ProductosService.insertarProducto(this.solicitudActual).subscribe(
        res => {
          if (res['status'] === 'success') {
            this.datosProductos.push(this.solicitudActual)
            this.toasterManagerService.makeToast('Success', 'Agregar', 'Producto agregado');
          }
        }
      );

    }
    //Si se inicia para modificar    
    else {
      this.ProductosService.modificarProducto(this.solicitudActual).subscribe(
        res => {
          if (res['status'] === 'success') {
            this.producto.nombre = this.solicitudActual.nombre;
            this.producto.precio = this.solicitudActual.precio;
            this.producto.impuesto = this.solicitudActual.impuesto;
            this.toasterManagerService.makeToast('success', 'Modificar', 'Producto modificado');
          }

        });

    }
    this.activeModal.close();
  }


}
