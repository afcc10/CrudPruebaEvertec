import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Opciones } from 'src/app/data-structures/interfaces/Opciones';
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
  selectedFile: File = null;

  options:  Opciones[] = [
    { label: 'Soltero', value: 0 },
    { label: 'Casado', value: 1 }
  ];

  selectedOption: any;

  mobSoloLetras = "[a-zA-Z ]{2,254}";  
  mobSoloNumero = "^([0-9])*$"

  @Input() Persona:any;
  id: number = 0;
  nombre: string = "";
  apellido: string = "";
  fechaNacimiento: Date = new Date;
  fotoUsuario: string = "";
  estadoCivil: number = 0;
  tieneHermanos: boolean = false;

  ngOnInit(): void {
    this.id = this.Persona.id;
    this.nombre = this.Persona.nombre;
    this.apellido = this.Persona.apellido;
    this.fechaNacimiento = this.Persona.fechaNacimiento;
    this.fotoUsuario = this.Persona.fotoUsuario;
    this.estadoCivil = this.Persona.estadoCivil;
    this.tieneHermanos = this.Persona.tieneHermanos;
    this.createForm(); 
    if(this.Persona.id !=0){
      this.LlenarFormulario();
    }
  }

  createForm() {    
    this.formClient = this.fb.group({
      nombre: ['', [this.noWhitespaceValidator,Validators.required, Validators.pattern(this.mobSoloLetras)]],         
      apellido: ['', [this.noWhitespaceValidator,Validators.required, Validators.pattern(this.mobSoloLetras)]], 
      fechaNacimiento: ['', [this.noWhitespaceValidator,Validators.required]],       
      fotoUsuario: ['', [this.noWhitespaceValidator,Validators.required]],
      estadoCivil: ['', [Validators.required]],       
      tieneHermanos: ['', [this.noWhitespaceValidator,]],
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  LlenarFormulario()
  {
    this.formClient.setValue({nombre:this.Persona.nombre,apellido: this.Persona.apellido,
      fechaNacimiento:this.Persona.fechaNacimiento, fotoUsuario: this.Persona.fotoUsuario,
      estadoCivil: this.Persona.estadoCivil,tieneHermanos: this.Persona.tieneHermanos});
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
      nombre: this.formClient.get('nombre')?.value,
      apellido: this.formClient.get('apellido')?.value,
      fechaNacimiento: this.formClient.get('fechaNacimiento')?.value,
      fotoUsuario: this.formClient.get('fotoUsuario')?.value,
      estadoCivil: this.formClient.get('estadoCivil')?.value,
      tieneHermanos: this.formClient.get('tieneHermanos')?.value
    }
    return PersonaAdd;
  }
}
