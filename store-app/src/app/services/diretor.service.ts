import { Injectable } from '@angular/core';
import { Diretor } from '../models/diretor.model';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiretorService extends ServiceFirebase<Diretor> {

  constructor(firestore: AngularFirestore) {
    super(Diretor, firestore, 'diretores')
   }
}
