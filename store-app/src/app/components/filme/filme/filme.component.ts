import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Filme } from 'src/app/models/filme.model';
import { Subject, Observable } from 'rxjs';
import { FilmeService } from 'src/app/services/filme.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FilmeFormComponent } from './filme-form/filme-form.component';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent implements OnInit {

  filmes$: Observable<Filme[]>;
  displayedColumns = ['foto','titulo', 'duracaofilme', 'taxaaluguel', 'avaliacaofilme', 'dataatualizacao', 'operations'];
  filmes: Filme[] = [];
 

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('filme', { static: false }) filmeNome: ElementRef;

  constructor(
    private filmeService: FilmeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.filmeService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((filme) => this.filmes = filme);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  del(filme: Filme){
    Swal.fire({
      title: 'Confirma a exclusão do filme?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.filmeService.delete(filme.id)
          .then(() => {
            this.snackBar.open('Filme excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(FilmeFormComponent, {width: '1200px'});
  }

  edit(d: Filme){
    this.dialog.open(FilmeFormComponent, { width: '1200px', data: d});
  }

}
