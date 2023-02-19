import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonaComponent } from './Components/Persona/Persona.component';
import { ShowPersonaComponent } from './Components/Persona/show-Persona/show-Persona.component';
import { AddEditPersonaComponent } from './Components/Persona/add-edit-Persona/add-edit-Persona.component';

import { PersonaApiService } from './Services/Persona-api.service'

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    ShowPersonaComponent,
    AddEditPersonaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PersonaApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
