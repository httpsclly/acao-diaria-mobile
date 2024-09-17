import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importação dos módulos HttpClientModule e FormsModule
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Importação do componente AddTaskModalComponent
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskModalComponent // Declare o componente aqui
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
