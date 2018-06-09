import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: false,
})
export class FiltroPipe implements PipeTransform {
  private
  transform(clientes: any, buscar: any, adicional: string): any {
    if (buscar === undefined) return clientes;
    return clientes.filter(function (usuario) {
      if (adicional === 'Cedula'.toString()) {
        return usuario.cedula.toLowerCase().includes(buscar.toLowerCase());
      } else if (adicional === 'Nombre'.toString()) {
        const nombre = usuario.nombre + ' ' + usuario.apellidos;
        return nombre.toLowerCase().includes(buscar.toLowerCase());
      } else {
        return clientes;
      }
    })
  }

}
