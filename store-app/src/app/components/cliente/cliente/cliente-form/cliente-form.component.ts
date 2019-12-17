import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { Observable } from 'rxjs';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  dataAtual = new Date();
  title: string;

  formRegister = this.fb.group({
    id: [undefined],
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    endereco: ['', [Validators.required]],
    complemento: ['',[]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    telefone: ['', []],
    celular: ['', [Validators.required]],
    email: ['', [Validators.required]],
    ativo: ['', []],
    cpf: ['', [Validators.required]],
    dataatualizacao: ['', []],
    datacriacao: ['', []]
  });

  estados$: Observable<Estado[]>;

  constructor(
    public dialogRef: MatDialogRef<ClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente,

    private fb: FormBuilder,
    private clienteService: ClienteService,
    private estadoService: EstadoService,
    private snackBar: MatSnackBar,
  ) {
    if (this.cliente != null) {
      this.formRegister.setValue(cliente);
      this.title = 'Atualização Cadastro Cliente';
    } else {
      this.title = 'Novo Cadastro Cliente';
    }
  }

  ngOnInit() {
    this.estados$ = this.estadoService.list();
  }

  onSubmit() {
    let cliente: Cliente = this.formRegister.value;
    if (!cliente.id) {
      this.addCliente(cliente);
    } else {
      this.updateCliente(cliente);
    }
  }

  addCliente(cliente: Cliente) {
    cliente.datacriacao = this.dataAtual;
    cliente.dataatualizacao = this.dataAtual;
    this.clienteService.createOrUpdate(cliente)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateCliente(cliente: Cliente) {
    cliente.dataatualizacao = this.dataAtual;
    this.clienteService.createOrUpdate(cliente)
      .then(() => {
        this.snackBar.open('Cadastro atualizado sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch((e) => {
        this.snackBar.open('Erro ao atualizar cadastro!', 'OK', { duration: 2000 });
      })
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
