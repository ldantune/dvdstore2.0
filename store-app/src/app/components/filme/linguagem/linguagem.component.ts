import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Linguagem } from 'src/app/models/linguagem.model';
import { Subject, Observable } from 'rxjs';
import { LinguagemService } from 'src/app/services/linguagem.service';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { LinguagemFormComponent } from './linguagem-form/linguagem-form.component';

@Component({
  selector: 'app-linguagem',
  templateUrl: './linguagem.component.html',
  styleUrls: ['./linguagem.component.css']
})
export class LinguagemComponent implements OnInit {

  linguagens$: Observable<Linguagem[]>;
  displayedColumns = ['linguagem', 'dataatualizacao', 'operations'];
  linguagens: Linguagem[] = [];
 

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('linguagem', { static: false }) linguagemNome: ElementRef;

  constructor(
    private linguagemService: LinguagemService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.linguagemService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((linguagem) => this.linguagens = linguagem);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  del(linguagem: Linguagem){
    Swal.fire({
      title: 'Confirma a exclusão do linguagem?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.linguagemService.delete(linguagem.id)
          .then(() => {
            this.snackBar.open('Linguagem excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(LinguagemFormComponent, {width: '400px'});
  }

  edit(d: Linguagem){
    this.dialog.open(LinguagemFormComponent, { width: '400px', data: d});
  }

}
