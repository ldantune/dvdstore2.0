import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Categoria } from 'src/app/models/categoria.model';
import { Validators, FormBuilder } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  dataAtual = new Date();
  title: string;

  formRegister = this.fb.group({
    id: undefined,
    categoria: ['', [Validators.required]],
    dataatualizacao: ['', []]
  });

  constructor(
    public dialogRef: MatDialogRef<CategoriaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: Categoria,

    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
  ) {
    if (this.categoria != null) {
      this.formRegister.setValue(categoria);
      this.title = 'Atualização Categoria';
    } else {
      this.title = 'Cadastro Categoria';
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    let categoria: Categoria = this.formRegister.value;
    if (!categoria.id) {
      this.addCategoria(categoria);
    } else {
      this.updateCategoria(categoria);
    }
  }

  addCategoria(categoria: Categoria) {
    categoria.dataatualizacao = this.dataAtual;
    this.categoriaService.createOrUpdate(categoria)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateCategoria(categoria: Categoria) {
    categoria.dataatualizacao = this.dataAtual;
    this.categoriaService.createOrUpdate(categoria)
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
