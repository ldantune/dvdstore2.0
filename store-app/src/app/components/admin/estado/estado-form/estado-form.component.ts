import { Component, OnInit, Inject } from '@angular/core';
import { Estado } from 'src/app/models/estado.model';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.css']
})
export class EstadoFormComponent implements OnInit {

  dataAtual = new Date();
  title: string;
  edit: string;

  formRegister = this.fb.group({
    id: undefined,
    estado: ['', [Validators.required]],
    dataatualizacao: ['', []]
  });

  constructor(
    public dialogRef: MatDialogRef<EstadoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public estado: Estado,

    private fb: FormBuilder,
    private estadoService: EstadoService,
    private snackBar: MatSnackBar,
  ) {
    if (this.estado != null) {
      this.formRegister.setValue(estado);
      this.title = 'Atualização Cadastro Estado';
      this.edit = 'Atualizar'
    } else {
      this.title = 'Novo Cadastro Estado';
      this.edit = 'Salvar'
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    let estado: Estado = this.formRegister.value;
    if (!estado.id) {
      this.addEstado(estado);
    } else {
      this.updateEstado(estado);
    }
  }

  addEstado(estado: Estado) {
    estado.dataatualizacao = this.dataAtual;
    this.estadoService.createOrUpdate(estado)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateEstado(estado: Estado) {
    estado.dataatualizacao = this.dataAtual;
    this.estadoService.createOrUpdate(estado)
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
