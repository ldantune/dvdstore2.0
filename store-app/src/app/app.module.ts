import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/public/login/login.component';

import { AngularFireModule } from '@angular/fire';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { CadastroUsuarioComponent } from './components/public/cadastro-usuario/cadastro-usuario.component';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuComponent } from './core/menu/menu.component';
import { FooterComponent } from './core/footer/footer.component';
import { IMaskModule } from 'angular-imask';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CadastroUsuarioComponent,
    NotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    IMaskModule
    
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
