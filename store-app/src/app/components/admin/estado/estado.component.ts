import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Estado } from 'src/app/models/estado.model';
import { Observable, Subject } from 'rxjs';
import { EstadoService } from 'src/app/services/estado.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { EstadoFormComponent } from './estado-form/estado-form.component';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  estados$: Observable<Estado[]>;
  displayedColumns = ['estado', 'dataatualizacao', 'operations'];
  estados: Estado[] = [];
 

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('estado', { static: false }) atorNome: ElementRef;

  constructor(
    private estadoService: EstadoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.estadoService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((estado) => this.estados = estado);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  del(estado: Estado){
    Swal.fire({
      title: 'Confirma a exclusão do estado?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.estadoService.delete(estado.id)
          .then(() => {
            this.snackBar.open('Estado excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(EstadoFormComponent, {width: '400px'});
  }

  edit(d: Estado){
    this.dialog.open(EstadoFormComponent, { width: '400px', data: d});
  }

}
