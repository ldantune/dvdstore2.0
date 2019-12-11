import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { Categoria } from '../models/categoria.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends ServiceFirebase<Categoria>  {

  private categoriaCollection: AngularFirestoreCollection<Categoria> = this.firestore.collection('categorias');

  constructor(firestore: AngularFirestore) {
    super(Categoria, firestore, 'categorias')
   }
}
