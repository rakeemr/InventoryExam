import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes.service'
import { Cliente } from '../clientes';
import { error } from 'util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InsertarComponent } from '../insertar/insertar.component';
import { ToasterManagerService } from '../../../@core/toast/toaster-manager.service';
import { configToasterManager } from '../../../@core/toast/config';
import 'style-loader!angular2-toaster/toaster.css';
import { ModalConfirmacionService } from '../modal-confirmacion/modal-confirmacion.service';
@Component({
  selector: 'ngx-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: [
    './consultar.component.scss',
  ],
})
export class ConsultarComponent implements OnInit {

  constructor(private clientesService: ClientesService, private modalService: NgbModal,
    private modalConfirmacionService: ModalConfirmacionService, private toasterManagerService: ToasterManagerService) { }
  datosClientes: Cliente[];
  config = configToasterManager;
  opciones = ['Cedula', 'Nombre'];
  opcionSeleccionada: any = 'Cedula';
  getClientes(): void {
    this.clientesService.consultarClientes()
      .subscribe(res => { this.datosClientes = <Cliente[]>res['data'] },
        error => {
          this.toasterManagerService.makeToast('error', 'No se puede obtener clientes! ',
            'No se puede obtener clientes debido a un error con el servidor.')
        },
    );
  }
  ngOnInit() {
    this.getClientes();
  }
  abrirModal(cliente: Cliente) {
    const modalRef = this.modalService.open(InsertarComponent);
    modalRef.componentInstance.cliente = cliente;
    modalRef.componentInstance.listaClientes = this.datosClientes;
  }
  eliminarCliente(cliente: Cliente) {

    this.modalConfirmacionService.confirmar('Por favor confirme..', '¿Desea borrar el cliente ' + cliente.nombre + '?')
      .then((confirmed) => {
        if (confirmed) {
          const posicion = this.datosClientes.findIndex(
            (cliente: Cliente) => {
              return cliente.cedula === cliente.cedula;
            },
          );
          this.clientesService.borrarClientes(cliente.cedula).subscribe(
            () => {
              this.datosClientes.splice(posicion, 1),
                this.toasterManagerService.makeToast('success', 'Se ha borrado exitosamente!',
                  'Se ha eliminado el cliente ' + cliente.nombre +
                  ' correctamente.')
            },
            error => {
              this.toasterManagerService.makeToast('error', 'No se completo el eliminar! ',
                'No se ha eliminado el cliente ' + cliente.nombre +
                ' debido a un error con el servidor.')
            },
          );

        }
      })
  }
}
