import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { ServiceFirebase } from '../core/iservicefirebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceFirebase<Usuario> {

  private usuarioCollection: AngularFirestoreCollection<Usuario> = this.firestore.collection('usuarios');

  constructor(firestore:	AngularFirestore, private afAuth: AngularFireAuth) {
    super(Usuario, firestore, 'usuarios')
   }

   registro(usuario: Usuario): Observable<boolean> {
    return from(this.afAuth.auth
      .createUserWithEmailAndPassword(usuario.email, usuario.password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) =>
          this.usuarioCollection.doc(u.user.uid)
            .set({ ...usuario, id: u.user.uid })
            .then(() => true)
        ),
        catchError((err) => throwError(err))
      )
  }
}
