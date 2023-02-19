import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../data-structures/interfaces/Persona';
import { BasicResponse } from '../data-structures/shared/basic-response';
import { catchError, retry } from 'rxjs/operators';
import { ENDPOINTS } from '../utils/commons/web-constants';
import { handleError } from '../utils/helpers/error-handler';

@Injectable({
  providedIn: 'root'
})
export class PersonaApiService {

  constructor(private http: HttpClient) { }

  async getPersonas() : Promise<Partial<BasicResponse<Persona[]>>> {
    return await this.http.get<Partial<BasicResponse<Persona[]>>>(ENDPOINTS.getPersonas()).pipe(
      retry(1), 
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async registerPersona(Persona : Persona):Promise<Partial<BasicResponse<Persona>>>{    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(Persona);
    return await this.http.post<BasicResponse<Persona>>(ENDPOINTS.registerPersona(),body,httpOptions).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async updatePersona(cliente : Persona):Promise<Partial<BasicResponse<Persona>>>{    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(cliente);
    return await this.http.put<BasicResponse<Persona>>(ENDPOINTS.updatePersona(),body,httpOptions).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async getbyIdPersona(id : number): Promise<Partial<BasicResponse<Persona>>>{    
    return await this.http.get<BasicResponse<Persona>>(ENDPOINTS.getByIdPersona(id)).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async deleteById(id : number): Promise<Partial<BasicResponse<boolean>>>{    
    return await this.http.delete<BasicResponse<boolean>>(ENDPOINTS.deleteByIdPersona(id)).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }
}
