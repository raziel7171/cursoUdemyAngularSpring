import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { observable } from 'rxjs';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  cliente: Cliente = new Cliente();
  titulo:string ="Crear cliente";
  errores: string[];



  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente()
  }

cargarCliente(): void{
  this.activatedRoute.params.subscribe(params => {
    let id = params['id']
    if(id){
      this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
    }
  })
}

  create(): void{
    this.clienteService.create(this.cliente).subscribe(
      response => { this.router.navigate(['/clientes'])
      swal.fire('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con éxito!`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: '+ err.status);
      console.error(err.error.errors);
    }
    );
  }
  update(): void{
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: '+ err.status);
        console.error(err.error.errors);
      }
    )
  }

}
