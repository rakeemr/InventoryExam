import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Creado por estudiantes del
        <a href="https://www.tec.ac.cr/" style="color:#12024e">Tecnológico de Costa Rica</a>, Sede San Carlos ©2018</span>
  `,
})
export class FooterComponent {
}
