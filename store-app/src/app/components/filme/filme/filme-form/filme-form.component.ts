import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { Produtora } from 'src/app/models/produtora.model';
import { FormBuilder, Validators } from '@angular/forms';
import { FilmeService } from 'src/app/services/filme.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdutoraService } from 'src/app/services/produtora.service';
import { Filme } from 'src/app/models/filme.model';
import { Diretor } from 'src/app/models/diretor.model';
import { DiretorService } from 'src/app/services/diretor.service';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-filme-form',
  templateUrl: './filme-form.component.html',
  styleUrls: ['./filme-form.component.css']
})
export class FilmeFormComponent implements OnInit {

  dataAtual = new Date();
  title: string;
  edit: string;

  formRegister = this.fb.group({
    id: [undefined],
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    anolancamento: ['', []],
    duracaoaluguel: ['', [Validators.required]],
    taxaaluguel: ['', [Validators.required]],
    duracaofilme: ['', [Validators.required]],
    custoreposicao: ['', [Validators.required]],
    avaliacaofilme: ['', [Validators.required]],
    classificacao: ['', [Validators.required]],
    diretor: ['', []],
    categoria: ['', []],
    produtora: ['', []],
    dataatualizacao: ['', []],
    foto: ['', [Validators.required]]
  });


  diretores$: Observable<Diretor[]>;
  categorias$: Observable<Categoria[]>;
  produtores$: Observable<Produtora[]>;

  //Para upload da foto
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;

  constructor(
    public dialogRef: MatDialogRef<FilmeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public filme: Filme,

    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private filmeService: FilmeService,
    private snackBar: MatSnackBar,
    private diretorService: DiretorService,
    private categoriaService: CategoriaService,
    private produtoraService: ProdutoraService
  ) { 
    if (this.filme != null) {
      this.formRegister.setValue(filme);
      this.title = 'Atualização Cadastro Filme';
      this.edit = 'Atualizar'
    } else {
      this.title = 'Novo Cadastro Filme';
      this.edit = 'Cadastrar'
    }
  }

  ngOnInit() {
    this.diretores$ = this.diretorService.list();
    this.categorias$ = this.categoriaService.list();
    this.produtores$ = this.produtoraService.list();
  }

  onSubmit() {
    let filme: Filme = this.formRegister.value;
    if (!filme.id) {
      this.addFilme(filme);
    } else {
      this.updateFilme(filme);
    }
  }

  addFilme(filme: Filme) {
    filme.dataatualizacao = this.dataAtual;
    this.filmeService.createOrUpdate(filme)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateFilme(filme: Filme) {
    filme.dataatualizacao = this.dataAtual;
    this.filmeService.createOrUpdate(filme)
      .then(() => {
        this.snackBar.open('Cadastro atualizado sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch((e) => {
        this.snackBar.open('Erro ao atualizar cadastro!', 'OK', { duration: 2000 });
      })
  }

  async upload(event) {
    this.complete = false;
    const file = event.target.files[0];
    const path = `funcionarios/${new Date().getTime().toString()}`;
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.task.then(up => {
      fileRef.getDownloadURL().subscribe(url => {
        this.complete = true;
        this.formRegister.patchValue({
          foto: url
        })
      });
    });
    this.uploadPercent = this.task.percentageChanges();
    this.inputFile.nativeElement.value = '';
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
