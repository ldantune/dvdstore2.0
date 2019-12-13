import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Estado } from '../models/estado.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EstadoService extends ServiceFirebase<Estado>{

  constructor(firestore: AngularFirestore) {
    super(Estado, firestore, 'estados')
   }
}
