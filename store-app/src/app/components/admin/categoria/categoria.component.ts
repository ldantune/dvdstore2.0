import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias$: Observable<Categoria[]>;
  displayedColumns = ['categoria', 'dataatualizacao', 'operations'];
  categorias: Categoria[] = [];
 

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('categoria', { static: false }) categoriaNome: ElementRef;

  constructor(
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.categoriaService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((categoria) => this.categorias = categoria);
    //this.categorias$ = this.categoriaService.getCategorias();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  del(categoria: Categoria){
    Swal.fire({
      title: 'Confirma a exclusão da categoria?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.categoriaService.delete(categoria.id)
          .then(() => {
            this.snackBar.open('Categoria excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  
  // del(id: string) {
  //   this.categoriaService.delete(id)
  //     .then(() => {
  //       this.snackBar.open('Categoria excluido com sucesso!', 'OK', { duration: 2000 });
  //     })
  //     .catch((e) => {
  //       this.snackBar.open('Erro ao  excluir categoria!', 'OK', { duration: 2000 });
  //     })
  // }


  novoCadastro(){
    this.dialog.open(CategoriaFormComponent, {width: '400px'});
  }

  edit(c: Categoria){
    this.dialog.open(CategoriaFormComponent, { width: '400px', data: c});
  }




}
