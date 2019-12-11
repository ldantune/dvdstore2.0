import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Linguagem } from 'src/app/models/linguagem.model';
import { LinguagemService } from 'src/app/services/linguagem.service';

@Component({
  selector: 'app-linguagem-form',
  templateUrl: './linguagem-form.component.html',
  styleUrls: ['./linguagem-form.component.css']
})
export class LinguagemFormComponent implements OnInit {

  dataAtual = new Date();
  title: string;

  formRegister = this.fb.group({
    id: undefined,
    linguagem: ['', [Validators.required]],
    dataatualizacao: ['', []]
  });

  constructor(
    public dialogRef: MatDialogRef<LinguagemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public linguagem: Linguagem,

    private fb: FormBuilder,
    private linguagemService: LinguagemService,
    private snackBar: MatSnackBar,
  ) {
    if (this.linguagem != null) {
      this.formRegister.setValue(linguagem);
      this.title = 'Atualização Cadastro Linguagem';
    } else {
      this.title = 'Novo Cadastro Linguagem';
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    let linguagem: Linguagem = this.formRegister.value;
    if (!linguagem.id) {
      this.addDiretor(linguagem);
    } else {
      this.updateDiretor(linguagem);
    }
  }

  addDiretor(linguagem: Linguagem) {
    linguagem.dataatualizacao = this.dataAtual;
    this.linguagemService.createOrUpdate(linguagem)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateDiretor(linguagem: Linguagem) {
    linguagem.dataatualizacao = this.dataAtual;
    this.linguagemService.createOrUpdate(linguagem)
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
