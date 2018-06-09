import { Injectable } from '@angular/core';
import { Cliente } from './clientes';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ClientesService {
  api: string = 'http://172.24.176.145:3000/';
  constructor(
    private http: HttpClient) { }

  consultarClientes() {
    return this.http.get(this.api.concat('clientes'), { responseType: 'json' });
  }
  insertarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.api.concat('crearCliente'), cliente, { responseType: 'json' })
  }
  modificarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.api.concat('actualizarCliente'), cliente, { responseType: 'json' })
  }
  borrarClientes(cedula: string): Observable<{}> {
    return this.http.delete(this.api.concat('eliminarCliente/' + cedula))
  }
}