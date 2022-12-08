import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modelos/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre : '',
    apellido: '',
    email : '',
    saldo: 0
  }
  id:string='';

  constructor(private clienteServicio: ClienteServicio,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    
    this.clienteServicio.getCliente(this.id).subscribe(cliente =>{
      this.cliente=cliente;
    });
    this.changeDetectorRef.detectChanges();
  }

  guardar(data: NgForm){
    if(!data.valid){
      
    }else{
      data.value.id = this.id;
      this.clienteServicio.modificar(data.value);
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if(confirm('Seguro que desea eliminar el cliente')){
      this.clienteServicio.eliminarCliente(this.cliente);
    }else{
      this.router.navigate(['/']);
    }
  }

}
