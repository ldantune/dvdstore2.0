import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Produtora } from 'src/app/models/produtora.model';
import { ProdutoraService } from 'src/app/services/produtora.service';

@Component({
  selector: 'app-produtora-form',
  templateUrl: './produtora-form.component.html',
  styleUrls: ['./produtora-form.component.css']
})
export class ProdutoraFormComponent implements OnInit {

  dataAtual = new Date();
  title: string;

  formRegister = this.fb.group({
    id: undefined,
    produtora: ['', [Validators.required]],
    dataatualizacao: ['', []]
  });

  constructor(
    public dialogRef: MatDialogRef<ProdutoraFormComponent>,
    @Inject(MAT_DIALOG_DATA) public produtora: Produtora,

    private fb: FormBuilder,
    private produtoraService: ProdutoraService,
    private snackBar: MatSnackBar,
  ) {
    if (this.produtora != null) {
      this.formRegister.setValue(produtora);
      this.title = 'Atualização Cadastro Produtora';
    } else {
      this.title = 'Novo Cadastro Produtora';
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    let produtora: Produtora = this.formRegister.value;
    if (!produtora.id) {
      this.addDiretor(produtora);
    } else {
      this.updateDiretor(produtora);
    }
  }

  addDiretor(produtora: Produtora) {
    produtora.dataatualizacao = this.dataAtual;
    this.produtoraService.createOrUpdate(produtora)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateDiretor(produtora: Produtora) {
    produtora.dataatualizacao = this.dataAtual;
    this.produtoraService.createOrUpdate(produtora)
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
