import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';

@Injectable()
export class ModalConfirmacionService {

  constructor(private modalService: NgbModal) { }
    public confirmar(
    titulo: string,
    mensaje: string,
    btnOkText: string = 'Aceptar',
    btnCancelText: string = 'Cancelar',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ModalConfirmacionComponent, { size: dialogSize });
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.mensaje = mensaje;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
