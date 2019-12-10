import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Categoria } from '../models/categoria.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends ServiceFirebase<Categoria>  {

  constructor(firestore: AngularFirestore) {
    super(Categoria, firestore, 'categorias')
   }
}
