import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];


  constructor(private clienteService: ClienteService) {

   }

  ngOnInit(){
    this.clienteService.getClientes().subscribe(
    clientes => this.clientes = clientes,
    // function(clientes){
    //   this.clientes = clientes
    // }
    );
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
