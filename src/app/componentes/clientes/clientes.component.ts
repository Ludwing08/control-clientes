import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular/module/flash-messages.service';
import { Cliente } from 'src/app/modelos/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente = {
    nombre : '',
    apellido: '',
    email : '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm?: NgForm;
  @ViewChild("botonCerrar") botonCerrar?: ElementRef;

  constructor(private clientesServicio: ClienteServicio) { }

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );    
  }

  getSaldoTotal(){
    let saldoTotal:number =0;
    if(this.clientes){
      this.clientes.forEach(cliente => {
        saldoTotal += cliente.saldo
      })
    }
    return saldoTotal;
  }

  agregar(clienteForm:NgForm){
    if(!clienteForm.valid){
      
    }else{
      this.clientesServicio.agregarCliente(clienteForm.value);
      this.clienteForm?.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar?.nativeElement.click();
  }
}
