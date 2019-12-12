import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AtorFilme } from 'src/app/models/atorFilme.model';
import { AtorService } from 'src/app/services/ator.service';
import { AtorFilmeService } from 'src/app/services/ator-filme.service';
import { FilmeService } from 'src/app/services/filme.service';
import { Observable } from 'rxjs';
import { Ator } from 'src/app/models/ator.model';
import { Filme } from 'src/app/models/filme.model';

@Component({
  selector: 'app-ator-filme-form',
  templateUrl: './ator-filme-form.component.html',
  styleUrls: ['./ator-filme-form.component.css']
})
export class AtorFilmeFormComponent implements OnInit {

  dataAtual = new Date();
  title: string;

  edit: string;

  atores$: Observable<Ator[]>;
  filmes$: Observable<Filme[]>;

  formRegister = this.fb.group({
    id: undefined,
    ator: ['', [Validators.required]],
    filme: ['', [Validators.required]],
    dataatualizacao: ['', []]
  });

  constructor(
    public dialogRef: MatDialogRef<AtorFilmeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public atorFilme: AtorFilme,

    private fb: FormBuilder,
    private atorService: AtorService,
    private filmeService: FilmeService,
    private snackBar: MatSnackBar,
    private atorFilmeService: AtorFilmeService,
  ) {
    if (this.atorFilme != null) {
      this.formRegister.setValue(atorFilme);
      this.title = 'Atualização Cadastro Ator Filme';
      this.edit = 'Atualizar'
    } else {
      this.title = 'Novo Cadastro Ator Filme';
      this.edit = 'Cadastrar'
    }
  }

  ngOnInit() {
    this.atores$ = this.atorService.list();
    this.filmes$ = this.filmeService.list();
  }

  onSubmit() {
    let atorFilme: AtorFilme = this.formRegister.value;
    if (!atorFilme.id) {
      this.addAtorFilme(atorFilme);
    } else {
      this.updateAtorFilme(atorFilme);
    }
  }

  addAtorFilme(atorFilme: AtorFilme) {
    atorFilme.dataatualizacao = this.dataAtual;
    this.atorFilmeService.createOrUpdate(atorFilme)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateAtorFilme(atorFilme: AtorFilme) {
    atorFilme.dataatualizacao = this.dataAtual;
    this.atorFilmeService.createOrUpdate(atorFilme)
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
