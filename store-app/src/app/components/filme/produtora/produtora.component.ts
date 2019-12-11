import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Produtora } from 'src/app/models/produtora.model';
import { ProdutoraFormComponent } from './produtora-form/produtora-form.component';
import { Observable, Subject } from 'rxjs';
import { ProdutoraService } from 'src/app/services/produtora.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtora',
  templateUrl: './produtora.component.html',
  styleUrls: ['./produtora.component.css']
})
export class ProdutoraComponent implements OnInit {

  produtoras$: Observable<Produtora[]>;
  displayedColumns = ['produtora', 'dataatualizacao', 'operations'];
  produtoras: Produtora[] = [];
 

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild('produtora', { static: false }) produtoraNome: ElementRef;

  constructor(
    private produtoraService: ProdutoraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.produtoraService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((produtora) => this.produtoras = produtora);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
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
