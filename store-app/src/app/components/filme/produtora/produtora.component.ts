import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Produtora } from 'src/app/models/produtora.model';
import { ProdutoraFormComponent } from './produtora-form/produtora-form.component';
import { Observable, Subject } from 'rxjs';
import { ProdutoraService } from 'src/app/services/produtora.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtora',
  templateUrl: './produtora.component.html',
  styleUrls: ['./produtora.component.css']
})
export class ProdutoraComponent implements OnInit {

  displayedColumns = ['produtora', 'dataatualizacao', 'operations'];
  produtoras: MatTableDataSource<Produtora>;
 
  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild('produtora', { static: false }) produtoraNome: ElementRef;

  constructor(
    private produtoraService: ProdutoraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.produtoraService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((produtora) => {
        this.produtoras = new MatTableDataSource<Produtora>(produtora);
        this.produtoras.sort = this.sort;
        this.produtoras.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  applyFilter(filterValue: string) {
    this.produtoras.filter = filterValue.trim().toLowerCase();

    if (this.produtoras.paginator) {
      this.produtoras.paginator.firstPage();
    }
  }

  del(produtora: Produtora){
    Swal.fire({
      title: 'Confirma a exclusão do produtora?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.produtoraService.delete(produtora.id)
          .then(() => {
            this.snackBar.open('Produtora excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(ProdutoraFormComponent, {width: '400px'});
  }

  edit(p: Produtora){
    this.dialog.open(ProdutoraFormComponent, { width: '400px', data: p});
  }
}
