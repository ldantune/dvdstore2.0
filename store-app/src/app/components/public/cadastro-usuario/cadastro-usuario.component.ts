import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  public mask: any = {
    mask: '+{55} (00) 0000-0000',
    
  };

  

  formRegister: FormGroup = this.fb.group({
    'nome': ['', [Validators.required]],
    'sobrenome': ['', [Validators.required]],
    'endereco': ['',[]],
    'cidade': ['',[]],
    'estado': ['', []],
    'telefone': ['', []],
    'celular': ['', []],
    'email': ['', [Validators.required, Validators.email]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]],
  }, 
  {validator: this.matchingPasswords});

  estados = ['Acre - AC', 'Alagoas - AL', 'Amapá - AP', 'Amazonas - AM', 'Bahia  - BA', 'Ceará - CE', 'Distrito Federal  - DF',
    'Espírito Santo - ES', 'Goiás - GO', 'Maranhão - MA', 'Mato Grosso - MT', 'Mato Grosso do Sul - MS', 'Minas Gerais - MG', 
    'Pará - PA', 'Paraíba - PB', 'Paraná - PR', 'Pernambuco - PE', 'Piauí - PI', 'Rio de Janeiro - RJ', 'Rio Grande do Norte - RN', 
    'Rio Grande do Sul - RS', 'Rondônia - RO', 'Roraima - RR', 'Santa Catarina - SC', 'São Paulo - SP', 'Sergipe - SE', 'Tocantins - TO'];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  matchingPasswords(group: FormGroup){
    if(group){
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if(password1 == password2){
        return null;
      }
    }
    return {matching: false};
  }

  onSubmit(){
    let usuario: Usuario = this.formRegister.value;
    usuario.password = this.formRegister.value.password1;
    this.usuarioService.registro(usuario)
      .subscribe(
        (u)=>{
          this.snackBar.open(
            'Usuário cadastrado com sucesso.', 'ok',
            {duration: 2000}
          );
          this.router.navigateByUrl('/admin/home');
        },
        (err)=> {
          console.log(err);
          this.snackBar.open('Erro ao realizar cadastro do usuário', 'ok', {duration: 2000});
        }
      );
  }

}
