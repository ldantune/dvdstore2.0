import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ClienteService } from 'src/app/services/cliente.service';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { EstadoService } from 'src/app/services/estado.service';
import { Estado } from 'src/app/models/estado.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes$: Observable<Cliente[]>;
  displayedColumns = ['ativo','nome', 'sobrenome', 'cpf', 'celular','datacriacao', 'dataatualizacao', 'operations'];
  clientes: MatTableDataSource<Cliente>;
 
  

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild('cliente', { static: false }) atorNome: ElementRef;

  constructor(
    private atorService: ClienteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.atorService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cliente) => {
      this.clientes = new MatTableDataSource<Cliente>(cliente);
        this.clientes.sort = this.sort;
        this.clientes.paginator = this.paginator;
      });

  }



  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  filtro(filterValue: string) {
    this.clientes.filter = filterValue.trim().toLowerCase();

    if (this.clientes.paginator) {
      this.clientes.paginator.firstPage();
    }
  }

  del(cliente: Cliente){
    Swal.fire({
      title: 'Confirma a exclusão do cliente?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.atorService.delete(cliente.id)
          .then(() => {
            this.snackBar.open('Cliente excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(ClienteFormComponent, {width: '800px'});
  }

  edit(d: Cliente){
    this.dialog.open(ClienteFormComponent, { width: '800px', data: d});
  }

}
