import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Ator } from 'src/app/models/ator.model';
import { AtorService } from 'src/app/services/ator.service';

@Component({
  selector: 'app-ator-form',
  templateUrl: './ator-form.component.html',
  styleUrls: ['./ator-form.component.css']
})
export class AtorFormComponent implements OnInit {

  dataAtual = new Date();
  title: string;

  formRegister = this.fb.group({
    id: undefined,
    nome: ['', [Validators.required]],
    dataatualizacao: ['', []]
  });

  constructor(
    public dialogRef: MatDialogRef<AtorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public ator: Ator,

    private fb: FormBuilder,
    private atorService: AtorService,
    private snackBar: MatSnackBar,
  ) {
    if (this.ator != null) {
      this.formRegister.setValue(ator);
      this.title = 'Atualização Cadastro Ator';
    } else {
      this.title = 'Novo Cadastro Ator';
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    let ator: Ator = this.formRegister.value;
    if (!ator.id) {
      this.addDiretor(ator);
    } else {
      this.updateDiretor(ator);
    }
  }

  addDiretor(ator: Ator) {
    ator.dataatualizacao = this.dataAtual;
    this.atorService.createOrUpdate(ator)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateDiretor(ator: Ator) {
    ator.dataatualizacao = this.dataAtual;
    this.atorService.createOrUpdate(ator)
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
