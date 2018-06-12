import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'nb-home',
    link: '/inventory/dashboard',
    home: true,
  }, {
    title: 'Clientes',
    icon: 'ion-ios-people',
    link: '/inventory/clientes/consultar',
  },
  {
    title: 'Productos',
    icon: 'ion-ios-cart',
    link: '/inventory/productos/consultar',
  },
  {
    title: 'Inventario',
    icon: 'nb-compose',
    link: '/inventory/inventario/consultar',
  },
  {
    title: 'Facturación',
    icon: 'ion-card',
    link: '/inventory/facturacion',
  },
];
