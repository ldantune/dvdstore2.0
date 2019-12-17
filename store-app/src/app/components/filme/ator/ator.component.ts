import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AtorService } from 'src/app/services/ator.service';
import { MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AtorFormComponent } from './ator-form/ator-form.component';
import { Ator } from 'src/app/models/ator.model';

@Component({
  selector: 'app-ator',
  templateUrl: './ator.component.html',
  styleUrls: ['./ator.component.css']
})
export class AtorComponent implements OnInit {

  atores$: Observable<Ator[]>;
  displayedColumns = ['nome', 'dataatualizacao', 'operations'];
  atores: MatTableDataSource<Ator>;
 

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild('ator', { static: false }) atorNome: ElementRef;

  constructor(
    private atorService: AtorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.atorService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((ator) => {
      this.atores = new MatTableDataSource<Ator>(ator);
        this.atores.sort = this.sort;
        this.atores.paginator = this.paginator;
      });

  }



  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  filtro(filterValue: string) {
    this.atores.filter = filterValue.trim().toLowerCase();

    if (this.atores.paginator) {
      this.atores.paginator.firstPage();
    }
  }

  del(ator: Ator){
    Swal.fire({
      title: 'Confirma a exclusão do ator?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.atorService.delete(ator.id)
          .then(() => {
            this.snackBar.open('Ator excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(AtorFormComponent, {width: '400px'});
  }

  edit(d: Ator){
    this.dialog.open(AtorFormComponent, { width: '400px', data: d});
  }

}
