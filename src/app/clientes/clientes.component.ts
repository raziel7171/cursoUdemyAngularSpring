import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador: any;


  constructor(private clienteService: ClienteService, private activateRoute: ActivatedRoute)
     {

     }


  ngOnInit(){

    this.activateRoute.paramMap.subscribe( params => {
      let page:number = +params.get('page')||0;

      if(!page){
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap(response => {
         (response.content as Cliente[]).forEach(cliente =>{
            console.log(cliente.nombre);
          });
        }))
      .subscribe(response => {
        this.clientes = response.content as Cliente[]
        this.paginador = response;

      });
    })

  }

  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `El cliente ${cliente.nombre} ${cliente.apellido} será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
            'Deleted!',
            `${cliente.nombre} ${cliente.apellido} eliminado !`,
            'success'
          )}
        )

      }
    })
  }


}
