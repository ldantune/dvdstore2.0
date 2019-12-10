import { Injectable } from '@angular/core';
import { Observable, from, throwError, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import *	as	firebase from 'firebase/app';
import { Usuario } from '../models/usuario.model';
import { switchMap, catchError, map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private usuarioCollection: AngularFirestoreCollection<Usuario> = this.afs.collection('usuarios');

  private user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore,) {
    this.user = afAuth.authState;
  }

  login(email: string, password: string): Observable<Usuario>{
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => this.usuarioCollection.doc<Usuario>(u.user.uid).valueChanges()),
        catchError(() => throwError('Credenciais inválidas ou usuário não registrado.'))
      )
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  authUser(): Observable<firebase.User> {
    return this.user;
  }

  getUsuario(): Observable<Usuario> {
    return this.afAuth.authState
      .pipe(
        switchMap(u => (u) ?
          this.usuarioCollection.doc<Usuario>(u.uid).valueChanges() : of(null))
      )
  }

  authenticated(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map(u => (u) ? true : false)
      )
  }
}
