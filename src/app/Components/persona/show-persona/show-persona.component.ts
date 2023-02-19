import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/data-structures/interfaces/Persona';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { PersonaApiService } from 'src/app/Services/persona-api.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-persona',
  templateUrl: './show-persona.component.html',
  styleUrls: ['./show-persona.component.css']
})
export class ShowPersonaComponent implements OnInit {

  PersonaS?: Partial<BasicResponse<Persona[]>>;
  modalTitle: string = '';
  activateAddEditPersonaComponent: boolean = false;
  Persona:any;
  PersonaModel? : Partial<BasicResponse<boolean>>;

  constructor(private _PersonaService: PersonaApiService) { }

  async ngOnInit(): Promise<void> {    
    this.getPersona();
  }

  async getPersona(){
    this['PersonaS'] = await this._PersonaService.getPersonas();
  }

  modalAdd(){
    this.Persona = {
      id:         0,
      userName:   '',
      firstName:  '',
      lastName:   '',
      age:        0,
      career:     ''
    }
    this.modalTitle = 'Add Persona';
    this.activateAddEditPersonaComponent = true;
  }

  async modalClose(){
    this.activateAddEditPersonaComponent = false;
    this.getPersona();
  }

  modalEdit(item:any){
    this.Persona = item;
    this.modalTitle = 'Edit Persona';
    this.activateAddEditPersonaComponent = true;
  }

  async delete(item:any){
    if(confirm(`Esta seguro de eliminar al estudiante ${item.id}`)){
      this.PersonaModel = await this._PersonaService.deleteById(item.id);
      if(this.PersonaModel.objectResponse !== null){      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('delete-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      },4000)

      this.getPersona();

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
  }

}
