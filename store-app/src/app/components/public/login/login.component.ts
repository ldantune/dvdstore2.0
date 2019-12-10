import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  });

  loading: boolean = false;

  email: string;
  senha: string;
  mensagem: string;
  emailEnviado: boolean;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthenticationService, 
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }


  private loginErrorNotification(err) {
    this.snackBar.open(err, 'OK', {duration: 2000})
  }


  onSubmit(){
    this.loading = true;
    let email = this.loginForm.value.email; 
     let password =  this.loginForm.value.password
    this.authServ.login(email, password)
      .subscribe(
        () => {
          this.router.navigateByUrl('/admin/home');
          this.loading = false;
        },
        (err) => {
          this.loginErrorNotification(err);
          this.loading = false;
        }
      );
  }


  async enviaLink() {
    const { value: email } = await Swal.fire({
      title: 'Informe o email cadastrado',
      input: 'email',
      inputPlaceholder: 'email'
    })
    if (email) {
      this.authServ.resetPassword(email)
        .then(() => {
          this.emailEnviado = true;
          this.mensagem = `Email enviado para ${email} com instruções para recuperação.`
        })
        .catch(erro => {
          this.mensagem = `Erro ao localizar o email. Detahes ${erro.message}`
        })
    }
  }

}
