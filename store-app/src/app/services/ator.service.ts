import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Ator } from '../models/ator.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AtorService extends ServiceFirebase<Ator>  {

  constructor(firestore: AngularFirestore) {
    super(Ator, firestore, 'atores')
   }
}