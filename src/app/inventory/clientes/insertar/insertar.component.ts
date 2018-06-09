import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../clientes';
import { ClientesService } from '../clientes.service';
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';
import { ModalConfirmacionService } from '../modal-confirmacion/modal-confirmacion.service';

@Component({
  selector: 'insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.scss']
})
export class InsertarComponent implements OnInit {

  @Input() cliente: Cliente;
  @Input() listaClientes;
  config = configToasterManager;
  constructor(public activeModal: NgbActiveModal, private toasterManagerService: ToasterManagerService,
    private modalConfirmacionService: ModalConfirmacionService, private clientesService: ClientesService) { }
  solicitudActual;
  titulo: string;
  deshabilitarCedula: boolean;
  ngOnInit() {
    this.solicitudActual = new Cliente();
    // si el cliente que viene desde consultar es null, es insertar en caso contrario es modificar.
    if (this.cliente == null) {
      this.titulo = 'Ingresar';
    } else { // si el cliente no es null, entonces es modificar
      this.titulo = 'Modificar';
      // deshabilitar el input de cedula
      this.deshabilitarCedula = true;
      // se copia el cliente que viene desde consultar a la solicitud actual
      this.solicitudActual = Object.assign({}, this.solicitudActual, this.cliente);
    }

  }
  // para guardar los cambios
  guardarDatos() {
    // cuando es insertar
    if (this.cliente == null) {
      // se envia post al backend para insertar clientes.

      this.clientesService.insertarCliente(this.solicitudActual).subscribe(
        /* Si se recibe status 200 se inserta el cliente a la lista*/
        res => {
          if (res['status'] == 'success') {
            this.listaClientes.push(this.solicitudActual);
            this.toasterManagerService.makeToast('success', 'Se ha insertado exitosamente!',
              'Se ha insertado el cliente ' + this.solicitudActual.cliente +
              ' correctamente.');
          }
        },
        error => {
          this.toasterManagerService.makeToast('error', 'No se completo el agregar! ',
            'No se ha agregado el cliente ' + this.solicitudActual.nombre_usuario +
            ' debido a un error con el servidor.');
        },
      );
      this.activeModal.close()
    } else {

      this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Quiere modificar el cliente ' + this.cliente.nombre + '?')
        .then((confirmed) => {
          if (confirmed) {
            // se envia put al backend para modificar clientes.
            this.clientesService.modificarCliente(this.solicitudActual).subscribe(
              /* se recibe el usuario que se modifico en la base de datos, y se modifica en la lista para poder
              visuarlizar cambios*/
              res => {
                if (res['status'] == 'success') {
                  this.cliente.nombre = this.solicitudActual.nombre;
                  this.cliente.apellidos = this.solicitudActual.apellidos;

                  this.toasterManagerService.makeToast('success', 'Se ha modificado exitosamente!',
                    'Se ha modificado el cliente ' + this.solicitudActual.nombre +
                    ' correctamente.');
                }

              },
              error => {
                this.toasterManagerService.makeToast('error', 'No se completo el modificar! ',
                  'No se ha modificado el cliente ' + this.solicitudActual.nombre +
                  ' debido a un error con el servidor.');
              },
            );
            // se cierra la ventana del modal
            this.activeModal.close()
          }
        })
    }
  }

}
