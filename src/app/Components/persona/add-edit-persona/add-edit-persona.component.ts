import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/data-structures/interfaces/Persona';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { PersonaApiService } from 'src/app/Services/persona-api.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrls: ['./add-edit-persona.component.css']
})
export class AddEditPersonaComponent implements OnInit {

  constructor(private _PersonaService: PersonaApiService,private fb: FormBuilder) { }

  public formClient!: FormGroup;
  PersonaModel? : Partial<BasicResponse<Persona>>;

  mobSoloLetras = "[a-zA-Z ]{2,254}";  
  mobSoloNumero = "^([0-9])*$"

  @Input() Persona:any;
  id: number = 0;
  firtsName: string = "";
  lastName: string = "";
  userName: string = "";
  age: number = 0;
  career: string = "";

  ngOnInit(): void {
    this.id = this.Persona.id;
    this.age = this.Persona.age;
    this.userName = this.Persona.userName;
    this.firtsName = this.Persona.firstName;
    this.lastName = this.Persona.lastName;
    this.career = this.Persona.career;
    this.createForm(); 
    if(this.Persona.id !=0){
      this.LlenarFormulario();
    }
  }

  createForm() {    
    this.formClient = this.fb.group({
      userName: ['', [this.noWhitespaceValidator,Validators.required]],         
      firstName: ['', [this.noWhitespaceValidator,Validators.required, Validators.pattern(this.mobSoloLetras)]], 
      lastName: ['', [this.noWhitespaceValidator,Validators.pattern(this.mobSoloLetras)]],       
      age: ['', [this.noWhitespaceValidator,Validators.required,Validators.pattern(this.mobSoloNumero)]],
      career: ['', [this.noWhitespaceValidator,Validators.pattern(this.mobSoloLetras)]],       
    });
  }

  LlenarFormulario()
  {
    this.formClient.setValue({userName:this.Persona.userName,age: this.Persona.age,
                              firstName:this.Persona.firstName, lastName: this.Persona.lastName,
                              career: this.Persona.career});
  }

  public noWhitespaceValidator(control: FormControl) {     
    if(control.value && control.value.length > 0){
      const isWhitespace = (control.value || '').trimStart().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
    }      
    return false;       
  }  

  async addPersona(){
    const PersonaSave = this.llenarPersona();    
    this.PersonaModel = await this._PersonaService.registerPersona(PersonaSave);
    if(this.PersonaModel.objectResponse !== null){      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      },4000)

    }
    else{
      Swal.fire({
        title: 'Persona',
        text: this.PersonaModel.message[0],
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      })     
    }
  }

  async UpdatePersona(){
    const PersonaSave = this.llenarPersona();    
    PersonaSave.id = this.id;
    this.PersonaModel = await this._PersonaService.updatePersona(PersonaSave);
    if(this.PersonaModel.objectResponse !== null){      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('update-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      },4000)

    }
    else{
      Swal.fire({
        title: 'Persona',
        text: this.PersonaModel.message[0],
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      })     
    }
  }

  public llenarPersona(){
    const PersonaAdd: Persona = {
      id: 0,
      age: this.formClient.get('age')?.value,
      career: this.formClient.get('career')?.value,
      firstName: this.formClient.get('firstName')?.value,
      lastName: this.formClient.get('lastName')?.value,
      userName: this.formClient.get('userName')?.value,
    }
    return PersonaAdd;
  }
}
