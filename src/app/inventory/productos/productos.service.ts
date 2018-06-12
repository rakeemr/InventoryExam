import { Injectable } from '@angular/core';
import { Producto } from './productos';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductosService {

  constructor(private http: HttpClient) { }


  api: string = "http://192.168.0.105:3000/";

  consultarProductos() {
    return this.http.get(this.api.concat('productos'), { responseType: 'json' })
  }

  insertarProducto(producto: Producto) {
    return this.http.post<Producto>(this.api.concat('crearProductos'), producto, { responseType: 'json' })
  }

  modificarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.api.concat('actualizarProductos'), producto, { responseType: 'json' })
  }

  borrarProducto(producto: Producto): Observable<{}> {
    return this.http.delete(this.api.concat('eliminarProductos/' + producto.ID), { responseType: 'text' })
  }

}
