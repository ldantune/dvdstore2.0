import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario$ : Observable<Usuario>;
  autenticacao$ : Observable<boolean>;

  constructor(
    private authService: AuthenticationService,
    private router: Router){
      this.usuario$ = this.authService.getUsuario();
      this.autenticacao$ = this.authService.authenticated();
    }
  

  ngOnInit() {
  }

  

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
