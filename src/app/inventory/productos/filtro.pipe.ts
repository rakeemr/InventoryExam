import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})

export class FiltroPipe implements PipeTransform {

  transform(productos: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return productos;
    return productos.filter(function (productos) {
      if (adicional === 'ID'.toString()) {
        return productos.ID.toLowerCase().includes(buscar.toLowerCase());
      }
      else if (adicional === 'Nombre'.toString()) {
        return productos.nombre.toLowerCase().includes(buscar.toLowerCase());
      }
      else {
        return productos;
      }
    })
  }
}
