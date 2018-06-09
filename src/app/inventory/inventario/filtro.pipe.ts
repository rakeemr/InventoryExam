import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})

export class FiltroPipe implements PipeTransform {

  transform(inventario: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return inventario;
    return inventario.filter(function (inventario) {
      if (adicional === 'ID'.toString()) {
        return inventario.ID.toLowerCase().includes(buscar.toLowerCase());
      }
      else if (adicional === 'Producto'.toString()) {
        return inventario.producto.toLowerCase().includes(buscar.toLowerCase());
      }
      else {
        return inventario;
      }
    })
  }
}
