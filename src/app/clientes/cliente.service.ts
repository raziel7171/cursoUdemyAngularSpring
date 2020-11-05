import { Injectable } from '@angular/core';
import {CLIENTES} from './clientes.json';
import {Cliente} from './cliente';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es-Co';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any>{
    // return of (CLIENTES);
    // return this.http.get<Cliente[]>(this.urlEndPoint); es necesario si no se importa el operators
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
          console.log('tab 1');
          (response.content as Cliente[]).forEach(cliente =>{
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
         (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.email = cliente.email.toLowerCase();
          let datePipe = new DatePipe('es');
          // cliente.createAt = datePipe.transform(cliente.createAt, 'fullDate');
          // ejemplos de variaciones para las fechas
          // cliente.createAt = datePipe.transform(cliente.createAt, 'EEE dd/MM MMMM/yyyy', 'en-US');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        (response.content as Cliente[]).forEach(cliente =>{
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al hacer la consulta', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
}
}
