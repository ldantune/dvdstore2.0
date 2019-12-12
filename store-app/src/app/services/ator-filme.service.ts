import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { AtorFilme } from '../models/atorFilme.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AtorFilmeService extends ServiceFirebase<AtorFilme>{

  constructor(firestore: AngularFirestore) {
    super(AtorFilme, firestore, 'atoresFilme')
   }
}
