import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Linguagem } from '../models/linguagem.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LinguagemService extends ServiceFirebase<Linguagem>{

  constructor(firestore: AngularFirestore) {
    super(Linguagem, firestore, 'linguagens')
   }
}
