import { Injectable } from '@angular/core';
import { Inventario } from './inventario';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class InventarioService {

  constructor(private http: HttpClient) { }


  api: string = "http://192.168.0.105:3000/";

  consultarInventario() {
    return this.http.get(this.api.concat('inventario'), { responseType: 'json' })
  }

  insertarInventario(inventario: Inventario) {
    return this.http.post<Inventario>(this.api.concat('crearInventario'), inventario, { responseType: 'json' })
  }

  modificarInventario(inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(this.api.concat('actualizarInventario'), inventario, { responseType: 'json' })
  }

  borrarInventario(inventario: Inventario): Observable<{}> {
    return this.http.delete(this.api.concat('eliminarInventario/' + inventario.ID), { responseType: 'text' })
  }

}
