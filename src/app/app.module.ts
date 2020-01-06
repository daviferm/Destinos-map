import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { EntregadosPipe } from './pipes/entregados.pipe';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  entryComponents: [
    ModalComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MapaComponent,
    EntregadosPipe,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuIOTWDbZeTEr8pXMMXxu-5PX_A6RBSis'
    }),
    BrowserAnimationsModule,
    DragDropModule,
    ScrollingModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatButtonModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
