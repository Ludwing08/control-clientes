import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email:string="";
  password:string="";

  constructor(
    private router:Router,
    private loginService: LoginService

  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['/']);
      }
    }
      )
  }

  registro(){
    this.loginService.registro(this.email,this.password)
    .then(x =>{
      this.router.navigate(['/'])
    })
    .catch(x =>{
      alert(x);
    });
  }
}
