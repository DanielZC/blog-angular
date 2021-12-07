import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MensajeService } from '../mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  apiUrl = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient, private mensajeService: MensajeService) { }

  crearUsuario(url: string, datosRegistro: any): Observable<any> {
    return this.http.post(this.apiUrl + url, datosRegistro).pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any){
    let mensajeError = ''

    if(error.error instanceof ErrorEvent)
    {
      mensajeError = error.error.message
    }
    else
    {
      mensajeError = `Error code: ${error.status} \nMensaje: ${error.message}`
    }
  
    return throwError(mensajeError)
  }
}
