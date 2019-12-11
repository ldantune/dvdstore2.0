import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Filme } from '../models/filme.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FilmeService extends ServiceFirebase<Filme>{

  constructor(firestore: AngularFirestore) {
    super(Filme, firestore, 'filmes')
   }
}
