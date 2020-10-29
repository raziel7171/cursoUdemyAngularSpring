import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto Spring';
  curso: string = 'Curso spring y angular 10';
  profesor: string = 'Mi profe el chileno';
}
