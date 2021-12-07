import { Injectable } from '@angular/core';
import Swal, { SweetAlertPosition, SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  private SwalHTML = Swal.mixin({
    focusConfirm: false,
    confirmButtonText: 'Entendido!',
  })

  mensajeToast(titulo: string, texto: string, icono: SweetAlertIcon, posicion: SweetAlertPosition): void {
    this.Toast.fire({
      icon: icono,
      title: titulo,
      text: texto,
      position: posicion
    })
  }

  mensajeHtml(titulo: string, texto: string, icono: SweetAlertIcon, html:string ): void {
    this.SwalHTML.fire({
      title: titulo,
      icon: icono,
      html: html
    })
  }
}
