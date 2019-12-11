import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Diretor } from 'src/app/models/diretor.model';
import { Observable, Subject } from 'rxjs';
import { DiretorService } from 'src/app/services/diretor.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DiretorFormComponent } from './diretor-form/diretor-form.component';

@Component({
  selector: 'app-diretor',
  templateUrl: './diretor.component.html',
  styleUrls: ['./diretor.component.css']
})
export class DiretorComponent implements OnInit {

  diretores$: Observable<Diretor[]>;
  displayedColumns = ['nome', 'sobrenome', 'dataatualizacao', 'operations'];
  diretores: Diretor[] = [];
 

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('diretor', { static: false }) diretorNome: ElementRef;

  constructor(
    private diretorService: DiretorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.diretorService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((diretor) => this.diretores = diretor);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  del(diretor: Diretor){
    Swal.fire({
      title: 'Confirma a exclusão do diretor?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.diretorService.delete(diretor.id)
          .then(() => {
            this.snackBar.open('Diretor excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(DiretorFormComponent, {width: '400px'});
  }

  edit(d: Diretor){
    this.dialog.open(DiretorFormComponent, { width: '400px', data: d});
  }

}
