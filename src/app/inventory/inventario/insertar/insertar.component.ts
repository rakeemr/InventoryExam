import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Inventario } from '../inventario'
import { InventarioService } from '../inventario.service';


import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.scss']
})
export class InsertarComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private InventarioService: InventarioService,
    private toasterManagerService: ToasterManagerService) { }

  @Input() inventario: Inventario;
  @Input() datosInventario;

  private solicitudActual;

  private Inventario;
  private titulo;

  config = configToasterManager;

  desabilitado: boolean;

  ngOnInit() {
    this.solicitudActual = new Inventario();
    this.InventarioService.consultarInventario()
      .subscribe(res => this.Inventario = res);

    //Si se inicia para insertar    
    if (this.inventario == null) {
      this.solicitudActual = new Inventario();
      this.titulo = 'Insertar';
    }

    //Si se inicia para modificar    
    else {
      this.titulo = 'Modificar';
      this.desabilitado = false;
      this.solicitudActual = Object.assign({}, this.solicitudActual, this.inventario);
    }
  }


  guardarDatos() {
    //Si se inicia para insertar    
    if (this.inventario == null) {
      this.InventarioService.insertarInventario(this.solicitudActual).subscribe(
        res => {
          if (res['status'] === 'success') {
            this.datosInventario.push(this.solicitudActual)
            this.toasterManagerService.makeToast('Success', 'Agregar', 'Inventario agregado');
          }
        }
      );

    }
    //Si se inicia para modificar    
    else {
      this.InventarioService.modificarInventario(this.solicitudActual).subscribe(
        res => {
          if (res['status'] === 'success') {
            this.inventario.producto = this.solicitudActual.producto;
            this.inventario.cantidad = this.solicitudActual.cantidad;
            this.inventario.cantidadMin = this.solicitudActual.cantidadMin;
            this.inventario.cantidadMax = this.solicitudActual.cantidadMax;
            this.inventario.gravado = this.solicitudActual.gravado;

            this.toasterManagerService.makeToast('success', 'Modificar', 'Inventario modificado');
          }

        });

    }
    this.activeModal.close();
  }


}
