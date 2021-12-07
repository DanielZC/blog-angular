import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MensajeService } from '../mensaje.service';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formularioRegistro = new FormGroup({
    nombreCompleto: new FormControl(''),
    usuario: new FormControl(''),
    contrasena: new FormControl(''),
    contrasena_confirmation: new FormControl(''),
  })

  nombreCompleto = ''
  private plantillaHtml: string = ''

  constructor(private registroService: RegistroService, private mensajeService: MensajeService) { }

  ngOnInit(): void {
  }

  crearUsuario(): void {

    this.registroService.crearUsuario('/crearUsuario', this.formularioRegistro.value).subscribe(response => {
      
      if(response.tipo == 'error')
      {
        Object.keys(response.contenido).map((indice) => {
          this.plantillaHtml += `<small style="color: red">${response.contenido[indice][0]}</small> <br>`
        })
  
        this.mensajeService.mensajeHtml('Errores detectados', 'Se han detectados lossiguientes errores:', 'warning', this.plantillaHtml)
        this.plantillaHtml = ''
      }

      if(response.tipo == 'success')
      {
        this.mensajeService.mensajeToast('Registro completado', 'El usuario ha sido creado', 'success', 'bottom-end')
      }
    }).closed
  }
}
