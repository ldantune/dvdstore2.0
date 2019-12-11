import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Produtora } from '../models/produtora.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProdutoraService extends ServiceFirebase<Produtora>{

  constructor(firestore: AngularFirestore) {
    super(Produtora, firestore, 'produtoras')
   }
}
