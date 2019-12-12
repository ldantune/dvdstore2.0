import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AtorFilme } from 'src/app/models/atorFilme.model';
import { Subject, Observable } from 'rxjs';
import { AtorFilmeService } from 'src/app/services/ator-filme.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AtorFilmeFormComponent } from './ator-filme-form/ator-filme-form.component';

@Component({
  selector: 'app-ator-filme',
  templateUrl: './ator-filme.component.html',
  styleUrls: ['./ator-filme.component.css']
})
export class AtorFilmeComponent implements OnInit {

  atoresFilme$: Observable<AtorFilme[]>;
  displayedColumns = ['ator', 'filme', 'dataatualizacao', 'operations'];
  atoresFilme: AtorFilme[] = [];
 

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('atorFilme', { static: false }) atorFilmeNome: ElementRef;

  constructor(
    private atorFilmeService: AtorFilmeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.atorFilmeService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((atorFilme) => this.atoresFilme = atorFilme);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  del(atorFilme: AtorFilme){
    Swal.fire({
      title: 'Confirma a exclusão do ator filme?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.atorFilmeService.delete(atorFilme.id)
          .then(() => {
            this.snackBar.open('Ator excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(AtorFilmeFormComponent, {width: '400px'});
  }

  edit(af: AtorFilme){
    this.dialog.open(AtorFilmeFormComponent, { width: '400px', data: af});
  }

}
