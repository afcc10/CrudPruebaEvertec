import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonaComponent } from './Components/persona/persona.component';
import { ShowPersonaComponent } from './Components/persona/show-persona/show-persona.component';
import { AddEditPersonaComponent } from './Components/persona/add-edit-persona/add-edit-persona.component';

import { PersonaApiService } from './Services/persona-api.service'

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
