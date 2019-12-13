import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Cliente } from '../models/cliente.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends ServiceFirebase<Cliente> {

  constructor(firestore: AngularFirestore) {
    super(Cliente, firestore, 'clientes')
   }
}
