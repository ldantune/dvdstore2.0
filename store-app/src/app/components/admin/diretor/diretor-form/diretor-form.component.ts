import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Diretor } from 'src/app/models/diretor.model';
import { DiretorService } from 'src/app/services/diretor.service';

@Component({
  selector: 'app-diretor-form',
  templateUrl: './diretor-form.component.html',
  styleUrls: ['./diretor-form.component.css']
})
export class DiretorFormComponent implements OnInit {

  dataAtual = new Date();
  title: string;

  formRegister = this.fb.group({
    id: undefined,
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    dataatualizacao: ['', []]
  });

  constructor(
    public dialogRef: MatDialogRef<DiretorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public diretor: Diretor,

    private fb: FormBuilder,
    private diretorService: DiretorService,
    private snackBar: MatSnackBar,
  ) {
    if (this.diretor != null) {
      this.formRegister.setValue(diretor);
      this.title = 'Atualização Cadastro Diretor';
    } else {
      this.title = 'Novo Cadastro Diretor';
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    let diretor: Diretor = this.formRegister.value;
    if (!diretor.id) {
      this.addDiretor(diretor);
    } else {
      this.updateDiretor(diretor);
    }
  }

  addDiretor(diretor: Diretor) {
    diretor.dataatualizacao = this.dataAtual;
    this.diretorService.createOrUpdate(diretor)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateDiretor(diretor: Diretor) {
    diretor.dataatualizacao = this.dataAtual;
    this.diretorService.createOrUpdate(diretor)
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
